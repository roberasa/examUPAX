import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragEnd, CdkDragExit, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {GroupsService} from "../services/groups.service";
import {timeout} from "rxjs/operators";
import {EmployeesService} from "../services/employees.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupsArr:any = [];
  employesGroup:any = [''];
  listEmployees:any = [];

  constructor(private groupsServices: GroupsService, private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getGroups();
  }


  getGroups() {
    let respService: any;
    const groups = new Promise((resolve) => {
      this.groupsServices.getGroups().subscribe(data => {
        respService = data;
        let arrGroups: any[] = [];
        for (let element of respService.data.groups) {
          arrGroups.push(element);
          this.groupsArr = arrGroups;
        }
        resolve(arrGroups);
      })
    });
    return groups;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listEmployees.empty;
    this.employesGroup.empty;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dragExited(event: CdkDragExit<string[]>) {
    let dragData: any;
    dragData = event.item.data;

    let respService: any;
    const employeesGroup = new Promise((resolve) => {
      this.listEmployees = [];
      this.employesGroup = [];
      this.employeeService.getEmployeesByIdGroup(dragData.id).subscribe(data => {
        respService = data;
        if (respService.success){
          let arrEmployeesGroup: any[] = [];
          for (let element of respService.data.employees) {
            arrEmployeesGroup.push(element);
            this.listEmployees = arrEmployeesGroup;
            resolve(arrEmployeesGroup);
          }
        }

      }, error => {
        this.listEmployees = [{name:'No hay empleados asociados a este grupo'}];
      });
    });
    return employeesGroup;

  }


  noReturnPredicate() {
    return false;
  }



}
