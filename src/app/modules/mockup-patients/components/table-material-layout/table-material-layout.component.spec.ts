import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMaterialLayoutComponent } from './table-material-layout.component';

describe('TableMaterialLayoutComponent', () => {
  let component: TableMaterialLayoutComponent;
  let fixture: ComponentFixture<TableMaterialLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMaterialLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMaterialLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
