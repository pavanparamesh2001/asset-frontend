import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset.model';


@Injectable({ providedIn: 'root' })
export class AssetService {
  private http = inject(HttpClient);
private baseUrl = 'https://asset-backend-3-sd2y.onrender.com/api/assets';

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.baseUrl);
  }

  getAssetById(id: string): Observable<Asset> {
    return this.http.get<Asset>(`${this.baseUrl}/${id}`);
  }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.baseUrl, asset);
  }
  getQrCodeUrl(id: string): string {
  return `${this.baseUrl}/${id}/qrcode`;
}

getPublicAsset(id: string): Observable<Asset> {
  return this.http.get<Asset>(`${this.baseUrl}/public/${id}`);
}
uploadInvoices(files: File[]): Observable<{ invoiceUrls: string[] }> {
  const formData = new FormData();
  files.forEach((file) => formData.append('invoices', file));
  return this.http.post<{ invoiceUrls: string[] }>(`${this.baseUrl}/upload-invoice`, formData);
}

getInvoiceUrl(relativePath: string): string {
  return `https://asset-backend-3-sd2y.onrender.com${relativePath}`;
}
updateAsset(id: string, asset: Partial<Asset>): Observable<Asset> {
  return this.http.put<Asset>(`${this.baseUrl}/${id}`, asset);
}
getStatusSummary(): Observable<{
  Available: number;
  Assigned: number;
  'In Repair': number;
  Disposed: number;
  'Lost/Stolen': number;
  total: number;
}> {
  return this.http.get<any>(`${this.baseUrl}/stats/summary`);
}
printQrLabel(asset: Asset) {
  const w = window.open('', '_blank', 'width=400,height=500');
  if (!w) return;
  w.document.write(`
    <html><body style="text-align:center;font-family:sans-serif;padding:20px">
      <img src="${this.getQrCodeUrl(asset._id!)}" style="width:220px" />
      <p style="font-weight:bold;margin-top:8px">${asset.assetTag}</p>
      <script>window.onload = () => window.print();</script>
    </body></html>
  `);
  w.document.close();
}
}