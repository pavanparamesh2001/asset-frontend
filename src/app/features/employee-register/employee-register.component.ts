import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-register.component.html'
})
export class EmployeeRegisterComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  submitting = false;
  errorMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    designation: [''],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]],
    department: ['', Validators.required]
  });


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete form',
        text: 'Please fill in all required fields before submitting.'
      });
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.employeeService.createEmployee(this.form.value as any).subscribe({
      next: () => {
        this.submitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Employee added',
          text: 'The employee was added successfully.',
          timer: 1800,
          showConfirmButton: false
        }).then(() => this.router.navigate(['/employees']));
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to add employee';
        this.submitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Failed to add employee',
          text: this.errorMessage
        });
      }
    });
  }
}