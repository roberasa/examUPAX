import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) {}

  getGroups() {
    const headers = new HttpHeaders().set('Content-type', 'application/json').set("Authorization", "Basic ");
    return this.http.get(environment.baseUrl + environment.urls.groups, { headers: headers });
  }
}
