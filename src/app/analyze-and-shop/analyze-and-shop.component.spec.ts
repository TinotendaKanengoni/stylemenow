import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeAndShopComponent } from './analyze-and-shop.component';

describe('AnalyzeAndShopComponent', () => {
  let component: AnalyzeAndShopComponent;
  let fixture: ComponentFixture<AnalyzeAndShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeAndShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeAndShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
