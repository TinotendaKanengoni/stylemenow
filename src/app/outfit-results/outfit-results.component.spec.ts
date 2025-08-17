import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitResultsComponent } from './outfit-results.component';

describe('OutfitResultsComponent', () => {
  let component: OutfitResultsComponent;
  let fixture: ComponentFixture<OutfitResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
