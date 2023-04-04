import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPatientSelectedComponent } from './dialog-patient-selected.component';

describe('DialogPatientSelectedComponent', () => {
  let component: DialogPatientSelectedComponent;
  let fixture: ComponentFixture<DialogPatientSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPatientSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPatientSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
