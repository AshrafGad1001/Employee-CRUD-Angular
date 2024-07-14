import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../http.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IEmployee } from '../../interfaces/Employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {


  constructor() { }

  formBuilder = inject(FormBuilder);
  HttpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    salary: [0, [Validators.required]],
    age: [0, [Validators.required]]
  });

  employeeId!: number;
  isEdit: boolean = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.HttpService.GetEmployee(this.employeeId).subscribe(result => {
        this.employeeForm.patchValue(result);
        // this.employeeForm.controls.email.disable();
      });
    }
  }




  save() {
    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      phone: this.employeeForm.value.phone!,
      age: this.employeeForm.value.age!,
      salary: this.employeeForm.value.salary!
    }
    if (this.isEdit) {
      this.HttpService.updateEmployee(this.employeeId, employee).subscribe(() => {
        this.router.navigateByUrl("/employee-list");
      });
    }
    else {
      this.HttpService.createEmployee(employee).subscribe(() => {
        this.router.navigateByUrl("/employee-list");
      });
    }
  }
}
