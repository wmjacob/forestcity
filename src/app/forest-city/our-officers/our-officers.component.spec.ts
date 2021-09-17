import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurOfficersComponent } from './our-officers.component';

describe('OurOfficersComponent', () => {
  let component: OurOfficersComponent;
  let fixture: ComponentFixture<OurOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
