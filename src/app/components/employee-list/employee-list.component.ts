import { HttpService } from './../../http.service';
import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/Employee';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  router = inject(Router);
  employeeList: IEmployee[] = [];
  HttpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary', 'action'];
  ngOnInit(): void {
    this.getDataFromServer();
  }
  getDataFromServer() {
    this.HttpService.GetAllEmployee().subscribe(
      result => {
        this.employeeList = result;
      }
    );
  }

  edit(id: number) {
    this.router.navigateByUrl("/employee/" + id);
  }

  delete(id: number) {
    this.HttpService.deleteEmployee(id).subscribe(() => {
      this.employeeList = this.employeeList.filter(x => x.id != id);
    });
  }
}
