import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { EmployeesService } from "../service/employees.service";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  displayedColumns = ["num", "name", "birthday"];
  dataSource = new MatTableDataSource<any>();
  employees: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private employeeService: EmployeesService) {
    this.getEmployees().then( employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por página";
    });

  }

  ngOnInit() {  }

  getEmployees(){
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



}
