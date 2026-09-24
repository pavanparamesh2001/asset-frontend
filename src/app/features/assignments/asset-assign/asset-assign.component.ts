import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { AssignmentService } from '../../../services/assignment.service';
import { Employee } from '../../../models/employee.model';


@Component({
  selector: 'app-asset-assign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asset-assign.component.html'
})
export class AssetAssignComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private assignmentService = inject(AssignmentService);

  assetId = this.route.snapshot.paramMap.get('id')!;
  employees: Employee[] = [];
  grades = ['A', 'B', 'C', 'D', 'F'];
  errorMessage = '';
  submitting = false;
  selectedFiles: File[] = [];
  previews: { name: string; url: string; isPdf: boolean }[] = [];

  form = this.fb.group({
    employee: ['', Validators.required],
    conditionGradeAtAssignment: ['', Validators.required],
    notes: ['']
  });

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data) => (this.employees = data));
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = Array.from(input.files ?? []);
    this.previews = this.selectedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      isPdf: file.type === 'application/pdf'
    }));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const submitAssignment = (photoUrls?: string[]) => {
      this.assignmentService
        .assignAsset({
          asset: this.assetId,
          ...this.form.value,
          conditionPhotosAtAssignment: photoUrls
        } as any)
        .subscribe({
          next: () => this.router.navigate(['/assets']),
          error: (err) => {
            this.errorMessage = err.error?.message || 'Failed to assign asset';
            this.submitting = false;
          }
        });
    };

    if (this.selectedFiles.length > 0) {
      this.assignmentService.uploadPhotos(this.selectedFiles).subscribe({
        next: (res) => submitAssignment(res.photoUrls),
        error: () => {
          this.errorMessage = 'Failed to upload files';
          this.submitting = false;
        }
      });
    } else {
      submitAssignment();
    }
  }
}