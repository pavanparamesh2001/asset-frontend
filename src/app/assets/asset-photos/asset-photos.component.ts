import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';


@Component({
  selector: 'app-asset-photos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './asset-photos.component.html'
})
export class AssetPhotosComponent implements OnInit {
  protected assignmentService = inject(AssignmentService);
  private route = inject(ActivatedRoute);

  assignment: any = null;
  loading = true;
  notFound = false;

  ngOnInit() {
    const assetId = this.route.snapshot.paramMap.get('id')!;
    this.assignmentService.getLatestAssignmentForAsset(assetId).subscribe({
      next: (data) => {
        this.assignment = data;
        this.loading = false;
      },
      error: () => {
        this.notFound = true;
        this.loading = false;
      }
    });
  }
}
