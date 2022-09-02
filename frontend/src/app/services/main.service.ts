import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient:HttpClient) { }
  saveEmployee(employeeName:String):Observable<any>{
    let API_URL = 'http://localhost:8080/employees'
    return this.httpClient.post(API_URL,{name:employeeName},{observe:'response'});
  }
  saveSkill(employeeId:Number,skillName:String):Observable<any>{
    let API_URL = 'http://localhost:8080/skills'
    let POSTData = {employeeId,name:skillName}
    return this.httpClient.post(API_URL,POSTData,{observe:'response'})
  }
  listEmployees():Observable<any>{
    let API_URL = 'http://localhost:8080/employees'
    return this.httpClient.get(API_URL);
  }
  deleteEmployeeById(employeeId:Number):Observable<any>{
    let API_URL = 'http://localhost:8080/employees/' + employeeId;
    return this.httpClient.delete(API_URL);
  }
}
