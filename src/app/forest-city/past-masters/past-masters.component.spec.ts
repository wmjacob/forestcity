import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMastersComponent } from './past-masters.component';

describe('PastMastersComponent', () => {
  let component: PastMastersComponent;
  let fixture: ComponentFixture<PastMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
