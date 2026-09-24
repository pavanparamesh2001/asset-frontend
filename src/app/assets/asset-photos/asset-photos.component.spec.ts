import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPhotosComponent } from './asset-photos.component';

describe('AssetPhotosComponent', () => {
  let component: AssetPhotosComponent;
  let fixture: ComponentFixture<AssetPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
