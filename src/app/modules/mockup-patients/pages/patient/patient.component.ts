import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientService } from '../../services/patient.service';
import { DateTime } from 'luxon';
import { MatTableDataSource } from '@angular/material/table';
import { TableMaterialLayoutComponent } from '../../components/table-material-layout/table-material-layout.component';
import { IPatient } from '../../interfaces/ipatient';
import { ColorButtom, ColumnTableMaterialLayout, TypeOption, TableEvent } from '../../components/table-material-layout/interfaces/table.interfaces';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [MatNativeDateModule]
})
export class PatientComponent implements OnInit {
  @ViewChild(TableMaterialLayoutComponent) tableMaterialLayoutComponent!: TableMaterialLayoutComponent;
  rangoFecha: FormGroup = new FormGroup({
    start: new FormControl<string | null>(null),
    end: new FormControl<string | null>(null),
  });
  patientDB: IPatient[] = []
  dataSource = new MatTableDataSource<IPatient>([]);
  displayedColumns: ColumnTableMaterialLayout[] = [
    { label: 'ID', nameVar: 'ID' },
    { label: 'Nombre', nameVar: 'Nombre' },
    { label: 'Apellido', nameVar: 'Apellido' },
    { label: 'Vinculacion', nameVar: 'Vinculacion' },
    { label: 'EPS', nameVar: 'EPS' },
    { label: 'Opciones', nameVar: 'Opciones', options: [
      { label: 'info', icon: 'info', action: 'openInfo', type: TypeOption.BUTTON_ICON, colorButtom: ColorButtom.BASIC }
    ]
  },
  ]

  constructor(private _patientService: PatientService) { }

  ngOnInit(): void { }

  getPatients() {
    const startDate =  DateTime.fromJSDate(this.rangoFecha.value.start).toFormat('yyyyMMdd')
    const endDate =  DateTime.fromJSDate(this.rangoFecha.value.end).toFormat('yyyyMMdd')
    if (this.rangoFecha.value.start && this.rangoFecha.value.end) {
      this._patientService.getPatients(startDate, endDate).then((data: IPatient[]) => {
        for (let index = 0; index < data.length; index++) {
          data[index].ID = index + 1
        }
        this.patientDB = data
        this.tableMaterialLayoutComponent.renderRows(this.patientDB)
      })
    }
  }

  triggerTable(event: TableEvent){
    console.log(event)
  }
}
