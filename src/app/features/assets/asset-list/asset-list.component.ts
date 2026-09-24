
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Asset } from '../../../models/asset.model';
import { AssetService } from '../../../services/asset.service';


@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './asset-list.component.html'
})
export class AssetListComponent implements OnInit {
  protected assetService = inject(AssetService);
  assets: Asset[] = [];
  summary: any = null;
  loading = true;

  searchText = '';
  categoryFilter = '';
  statusFilter = '';

  categories = ['Systems', 'Electronics', 'Accessories', 'Furniture', 'SIM', 'Pantry Items', 'Miscellaneous'];
  statuses = ['Available', 'Assigned', 'In Repair', 'Disposed', 'Lost/Stolen'];

  ngOnInit() {
    this.assetService.getAssets().subscribe({
      next: (data) => { this.assets = data; this.loading = false; },
      error: () => { this.loading = false; }
    });

    this.assetService.getStatusSummary().subscribe({
      next: (data) => { this.summary = data; },
      error: () => {}
    });
  }

  get filteredAssets(): Asset[] {
    const search = this.searchText.trim().toLowerCase();

    return this.assets.filter((asset) => {
      const matchesSearch = !search || [
        asset.assetTag,
        asset.assetName,
        asset.brand,
        asset.deviceModel,
        asset.serialNumber
      ].some((field) => field?.toLowerCase().includes(search));

      const matchesCategory = !this.categoryFilter || asset.category === this.categoryFilter;
      const matchesStatus = !this.statusFilter || asset.status === this.statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }
  openInvoiceMenuFor: string | null = null;

toggleInvoiceMenu(assetId: string) {
  this.openInvoiceMenuFor = this.openInvoiceMenuFor === assetId ? null : assetId;
}

  clearFilters() {
    this.searchText = '';
    this.categoryFilter = '';
    this.statusFilter = '';
  }
}
