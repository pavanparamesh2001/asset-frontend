import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employeeId = this.route.snapshot.paramMap.get('id')!;
  submitting = false;
  loading = true;
  errorMessage = '';

  form = this.fb.group({
   
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    department: [''],
    designation: [''],
  });

  ngOnInit() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (emp) => {
        this.form.patchValue(emp);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.employeeService.updateEmployee(this.employeeId, this.form.value as any).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update employee';
        this.submitting = false;
      }
    });
  }
}
