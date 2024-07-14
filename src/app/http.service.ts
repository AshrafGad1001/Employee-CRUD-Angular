import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from './interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7173";
  http = inject(HttpClient);
  constructor() { }


  GetAllEmployee() {
    return this.http.get<IEmployee[]>(this.apiUrl + "/api/Employee");
  }

  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + "/api/Employee", employee);
  }
  GetEmployee(empId: number) {
    return this.http.get<IEmployee>(this.apiUrl + "/api/Employee/" + empId);
  }
  updateEmployee(employeeId: number, employee: IEmployee) {
    return this.http.put<IEmployee>(this.apiUrl + "/api/Employee/" + employeeId, employee);
  }
  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + "/api/Employee/" + employeeId);
  }
}
