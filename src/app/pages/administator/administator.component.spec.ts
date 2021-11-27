import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministatorComponent } from './administator.component';

describe('AdministatorComponent', () => {
  let component: AdministatorComponent;
  let fixture: ComponentFixture<AdministatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
