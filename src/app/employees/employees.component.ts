import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { EmployeesService } from "../services/employees.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import swal from'sweetalert2';
import {Router} from "@angular/router";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  displayedColumns = ["num", "name", "birthday"];
  dataSource = new MatTableDataSource<any>();
  employees: any;
  filterValue: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeesService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.fillTable();
  }

  fillTable(){
    this.getEmployees().then(employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por página";
    });
  }

  getEmployees() {
    let respService: any;
    const employees = new Promise((resolve) => {
      this.employeeService.getEmployees().subscribe(data => {
        respService = data;
        let arrEmployees: any[] = [];
        for (let element of respService.data.employees) {
          arrEmployees.push(element);
        }
        resolve(arrEmployees);
      })
    });
    return employees;
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue;
  }

  registerEmployee() {
    const dialogRef = this.matDialog.open(EmployeesComponentDialog, {
      width: "30%"
    });
  }
}//End EmployeesComponent

@Component({
  selector: 'app-employees',
  templateUrl: './registerEmployee.component.html'
})
export class EmployeesComponentDialog{

  formRegister: FormGroup;

  constructor( public dialogRef: MatDialogRef<EmployeesComponentDialog>, private formBuilder: FormBuilder,
               private employeeService: EmployeesService, private router: Router, private employeesComponent: EmployeesComponent) {
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      birthday: new FormControl('', [Validators.required])
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  registerEmployee(){
    if (this.formRegister.valid){
      let response: any;
      this.employeeService.postRegisterEmployee(
        this.formRegister.controls['name'].value,
        this.formRegister.controls['last_name'].value,
        formatDate(this.formRegister.controls['birthday'].value, 'yyyy/MM/dd', 'en-MX')).subscribe( data => {
          response = data;
          if (response.success){
            this.dialogRef.close();
            this.dialogRef.afterClosed().subscribe(() => {
              this.employeesComponent.fillTable();
            });
            swal.fire({title: "El registro se realizó correctamente", icon: "success", confirmButtonText: "Aceptar"});

          } else {
            swal.fire({title: "Ocurrió un error", text: response.data, icon: "error", confirmButtonText: "Aceptar"});
          }
      });
    }
  }

}
