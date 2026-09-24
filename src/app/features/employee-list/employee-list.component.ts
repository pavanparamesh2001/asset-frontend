import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  employees: Employee[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => { this.employees = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  deleteEmployee(id: string) {
    if (!confirm('Remove this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => this.errorMessage = err.error?.message || 'Failed to remove employee'
    });
  }
}