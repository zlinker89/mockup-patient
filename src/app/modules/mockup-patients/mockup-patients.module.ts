import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './pages/patient/patient.component';
import { MockupPatientRoutingModule } from './mockup-patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableMaterialLayoutComponent } from './components/table-material-layout/table-material-layout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    PatientComponent,
    TableMaterialLayoutComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    MockupPatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MockupPatientsModule { }
