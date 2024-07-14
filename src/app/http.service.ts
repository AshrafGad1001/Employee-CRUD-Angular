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
}
