import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-scan-asset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scan-asset.component.html'
})
export class ScanAssetComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private assetService = inject(AssetService);

  asset: Asset | null = null;
  loading = true;
  notFound = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.assetService.getPublicAsset(id).subscribe({
      next: (a) => { this.asset = a; this.loading = false; },
      error: () => { this.notFound = true; this.loading = false; }
    });
  }
}