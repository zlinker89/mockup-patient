import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';

const routes: Routes = [
  {
    component: LayoutComponent,
    path: '',
    loadChildren: () => import('./modules/mockup-patients/mockup-patients.module').then(m => m.MockupPatientsModule)
  },
  {
    path: '**',
    redirectTo: '', pathMatch: 'full'
  }
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
