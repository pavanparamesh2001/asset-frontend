import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from '../../../services/asset.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-asset-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asset-register.component.html'
})
export class AssetRegisterComponent {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private router = inject(Router);

  categories = ['Systems', 'Electronics', 'Accessories', 'Furniture', 'SIM', 'Pantry Items', 'Miscellaneous'];
  assetTypes = ['Fixed Asset', 'Current Asset'];
  billStatuses = ['Yes', 'No', 'NA'];

  submitting = false;
  errorMessage = '';
  selectedInvoices: File[] = [];
  invoiceFileNames: string[] = [];

  form = this.fb.group({
    assetName: ['', Validators.required],
    category: ['', Validators.required],
    assetType: ['', Validators.required],
    brand: ['', Validators.required],
    deviceModel: ['', Validators.required],
    serialNumber: ['', Validators.required],
    purchaseDate: ['', Validators.required],
    purchaseCost: [null as number | null, Validators.required],
    warrantyEndDate: ['', Validators.required],
    billStatus: ['NA', Validators.required],
    billNumber: ['', Validators.required],
    department: ['', Validators.required],
    notes: ['', Validators.required]
  });

  onInvoicesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedInvoices = Array.from(input.files ?? []);
    this.invoiceFileNames = this.selectedInvoices.map((f) => f.name);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields.';
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete form',
        text: 'Please fill in all required fields before submitting.'
      });
      return;
    }

    if (this.selectedInvoices.length === 0) {
      this.errorMessage = 'At least one invoice file is required.';
      Swal.fire({
        icon: 'warning',
        title: 'Invoice required',
        text: 'Please attach at least one invoice file.'
      });
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const registerAsset = (invoiceUrls?: string[]) => {
      this.assetService.createAsset({
        ...this.form.value,
        invoiceFiles: invoiceUrls
      } as any).subscribe({
        next: () => {
          this.submitting = false;
          Swal.fire({
            icon: 'success',
            title: 'Asset registered',
            text: 'The asset has been registered successfully.',
            timer: 1800,
            showConfirmButton: false
          }).then(() => this.router.navigate(['/assets']));
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to register asset';
          this.submitting = false;
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: this.errorMessage
          });
        }
      });
    };

    this.assetService.uploadInvoices(this.selectedInvoices).subscribe({
      next: (res) => registerAsset(res.invoiceUrls),
      error: () => {
        this.errorMessage = 'Failed to upload invoice(s)';
        this.submitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Upload failed',
          text: this.errorMessage
        });
      }
    });
  }
}