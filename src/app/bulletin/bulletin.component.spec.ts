import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinComponent } from './bulletin.component';

describe('BulletinComponent', () => {
  let component: BulletinComponent;
  let fixture: ComponentFixture<BulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
