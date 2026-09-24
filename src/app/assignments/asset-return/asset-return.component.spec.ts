import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReturnComponent } from './asset-return.component';

describe('AssetReturnComponent', () => {
  let component: AssetReturnComponent;
  let fixture: ComponentFixture<AssetReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
