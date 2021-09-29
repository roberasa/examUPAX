import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  getEmployees() {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set("Authorization", "Basic ");
    return this.http.get(environment.baseUrl + environment.urls.employees, { headers: headers });
  }

  postRegisterEmployee(name: string, last_name:string, birthday: string){
    const headers= new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(environment.baseUrl + environment.urls.employees, {"name": name, "last_name": last_name, "birthday": birthday } , { headers: headers });
  }

  getEmployeesByIdGroup(id: number) {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set("Authorization", "Basic ");
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.baseUrl + environment.urls.employeesByGroup ,{ params: params ,headers: headers });
  }
}
