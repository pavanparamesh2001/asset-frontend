import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';


@Component({
  selector: 'app-asset-return',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asset-return.component.html'
})
export class AssetReturnComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected assignmentService = inject(AssignmentService);

  assetId = this.route.snapshot.paramMap.get('id')!;
  grades = ['A', 'B', 'C', 'D', 'F'];
  statuses = ['Available', 'In Repair', 'Lost/Stolen'];
  activeAssignment: any = null;
  loading = true;
  errorMessage = '';
  submitting = false;
  selectedFiles: File[] = [];
  previews: { name: string; url: string; isPdf: boolean }[] = [];

  form = this.fb.group({
    conditionGradeAtReturn: ['', Validators.required],
    resultingStatus: ['Available', Validators.required],
    returnNotes: ['']
  });

  ngOnInit() {
    this.assignmentService.getActiveAssignmentForAsset(this.assetId).subscribe({
      next: (data) => { this.activeAssignment = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
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

    const submitReturn = (photoUrls?: string[]) => {
      this.assignmentService
        .returnAsset(this.assetId, {
          ...this.form.value,
          conditionPhotosAtReturn: photoUrls
        } as any)
        .subscribe({
          next: () => this.router.navigate(['/assets']),
          error: (err) => {
            this.errorMessage = err.error?.message || 'Failed to return asset';
            this.submitting = false;
          }
        });
    };

    if (this.selectedFiles.length > 0) {
      this.assignmentService.uploadPhotos(this.selectedFiles).subscribe({
        next: (res) => submitReturn(res.photoUrls),
        error: () => {
          this.errorMessage = 'Failed to upload files';
          this.submitting = false;
        }
      });
    } else {
      submitReturn();
    }
  }
}