import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFaqComponent } from './modal-faq.component';

describe('ModalFaqComponent', () => {
  let component: ModalFaqComponent;
  let fixture: ComponentFixture<ModalFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
