import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanAssetComponent } from './scan-asset.component';

describe('ScanAssetComponent', () => {
  let component: ScanAssetComponent;
  let fixture: ComponentFixture<ScanAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
