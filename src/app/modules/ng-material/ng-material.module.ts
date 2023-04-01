import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class NgMaterialModule { }
