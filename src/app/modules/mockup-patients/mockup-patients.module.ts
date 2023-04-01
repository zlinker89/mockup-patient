import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './pages/patient/patient.component';
import { MockupPatientRoutingModule } from './mockup-patients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgMaterialModule } from '../ng-material/ng-material.module';



@NgModule({
  declarations: [
    HomeComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    MockupPatientRoutingModule,
    SharedModule,
  ]
})
export class MockupPatientsModule { }
