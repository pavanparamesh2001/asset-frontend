import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';


@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private http = inject(HttpClient);
  private baseUrl = `http://${window.location.hostname}:5000/api/assignments`;

  assignAsset(payload: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.baseUrl, payload);
  }

  returnAsset(assetId: string, payload: {
    conditionGradeAtReturn: string;
    conditionPhotoAtReturn?: string;
    returnNotes?: string;
    resultingStatus: string;
  }): Observable<Assignment> {
    return this.http.patch<Assignment>(`${this.baseUrl}/asset/${assetId}/return`, payload);
  }

  uploadPhotos(files: File[]): Observable<{ photoUrls: string[] }> {
  const formData = new FormData();
  files.forEach((file) => formData.append('photos', file));
  return this.http.post<{ photoUrls: string[] }>(`${this.baseUrl}/upload-photos`, formData);
}
getPhotoUrl(relativePath: string): string {
  return `http://${window.location.hostname}:5000${relativePath}`;
}
  getActiveAssignmentForAsset(assetId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/asset/${assetId}/active`);
  }
  getLatestAssignmentForAsset(assetId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/asset/${assetId}/latest`);
}
}