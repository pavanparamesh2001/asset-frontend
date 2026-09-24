import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';



@Component({
  selector: 'app-asset-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asset-edit.component.html'
})
export class AssetEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assetService = inject(AssetService);

  assetId = this.route.snapshot.paramMap.get('id')!;
  categories = ['Systems', 'Electronics', 'Accessories', 'Furniture', 'SIM', 'Pantry Items', 'Miscellaneous'];
  assetTypes = ['Fixed Asset', 'Current Asset'];
  billStatuses = ['Yes', 'No', 'NA'];

  loading = true;
  submitting = false;
  errorMessage = '';

  form = this.fb.group({
    assetName: ['', Validators.required],
    category: ['', Validators.required],
    assetType: ['', Validators.required],
    brand: ['', Validators.required],
    deviceModel: ['', Validators.required],
    serialNumber: ['', Validators.required],
    purchaseDate: ['', Validators.required],
    purchaseCost: [null as number | null],
    warrantyEndDate: [''],
    billStatus: ['NA'],
    billNumber: [''],
    department: [''],
    notes: ['']
  });

  ngOnInit() {
    this.assetService.getAssetById(this.assetId).subscribe({
      next: (asset) => {
        this.form.patchValue({
          ...asset,
          purchaseDate: asset.purchaseDate?.substring(0, 10),
          warrantyEndDate: asset.warrantyEndDate?.substring(0, 10)
        });
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
    this.assetService.updateAsset(this.assetId, this.form.value as any).subscribe({
      next: () => this.router.navigate(['/assets']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to update asset';
        this.submitting = false;
      }
    });
  }
}