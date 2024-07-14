import { HttpService } from './../../http.service';
import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/Employee';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList: IEmployee[] = [];
  HttpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary'];
  ngOnInit(): void {
    this.HttpService.GetAllEmployee().subscribe(
      result => {
        this.employeeList = result;
        console.log(this.employeeList);
      }
    );
  }
}
