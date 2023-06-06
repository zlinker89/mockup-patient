import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientService } from '../../services/patient.service';
import { DateTime } from 'luxon';
import { MatTableDataSource } from '@angular/material/table';
import { TableMaterialLayoutComponent } from '../../components/table-material-layout/table-material-layout.component';
import { IPatient } from '../../interfaces/ipatient';
import {
  ColorButtom,
  ColumnTableMaterialLayout,
  TypeOption,
  TableEvent,
} from '../../components/table-material-layout/interfaces/table.interfaces';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPatientSelectedComponent } from '../../components/dialog-patient-selected/dialog-patient-selected.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [MatNativeDateModule],
})
export class PatientComponent implements OnInit {
  @ViewChild(TableMaterialLayoutComponent)
  tableMaterialLayoutComponent!: TableMaterialLayoutComponent;
  rangoFecha: FormGroup = new FormGroup({
    start: new FormControl<string | null>(null),
    end: new FormControl<string | null>(null),
  });
  patientDB: IPatient[] = [];
  patientSelected: IPatient[] = [];
  dataSource = new MatTableDataSource<IPatient>([]);
  displayedColumns: ColumnTableMaterialLayout[] = [
    { label: 'Checkbox', nameVar: 'Checkbox' },
    { label: 'ID', nameVar: 'ID' },
    { label: 'Nombre', nameVar: 'Nombre' },
    { label: 'Apellido', nameVar: 'Apellido' },
    { label: 'TipoIdentificacion', nameVar: 'TipoIdentificacion' },
    { label: 'Identificacion', nameVar: 'Identificacion' },
    { label: 'Vinculacion', nameVar: 'Vinculacion' },
    { label: 'EPS', nameVar: 'EPS' },
    {
      label: 'Opciones',
      nameVar: 'Opciones',
      options: [
        {
          label: 'info',
          icon: 'info',
          action: 'openInfo',
          type: TypeOption.BUTTON_ICON,
          colorButtom: ColorButtom.BASIC,
        },
      ],
    },
  ];
  displayedColumnsModal: ColumnTableMaterialLayout[] = [
    { label: 'ID', nameVar: 'ID' },
    { label: 'Nombre', nameVar: 'Nombre' },
    { label: 'Apellido', nameVar: 'Apellido' },
    { label: 'TipoIdentificacion', nameVar: 'TipoIdentificacion' },
    { label: 'Identificacion', nameVar: 'Identificacion' },
    { label: 'Vinculacion', nameVar: 'Vinculacion' },
    { label: 'EPS', nameVar: 'EPS' },
    { label: 'Clasificacion', nameVar: 'Clasificacion' },
    { label: 'Etapa', nameVar: 'Etapa' },
    {
      label: 'Opciones',
      nameVar: 'Opciones',
      options: [
        {
          label: 'remover',
          icon: 'delete',
          action: 'deletePatient',
          type: TypeOption.BUTTON_ICON,
          colorButtom: ColorButtom.WARN,
        },
      ],
    },
  ];

  constructor(private _patientService: PatientService, public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  getPatients() {
    const startDate = DateTime.fromJSDate(this.rangoFecha.value.start).toFormat(
      'yyyyMMdd'
    );
    const endDate = DateTime.fromJSDate(this.rangoFecha.value.end).toFormat(
      'yyyyMMdd'
    );
    if (this.rangoFecha.value.start && this.rangoFecha.value.end) {
      this._patientService
        .getPatients(startDate, endDate)
        .then((data: IPatient[]) => {
          for (let index = 0; index < data.length; index++) {
            data[index].ID = index + 1;
            data[index].checked = false
            data[index].cf_1884 = ''
          }
          this.patientDB = data;
          this.tableMaterialLayoutComponent.renderRows(this.patientDB);
        });
    }
  }

  triggerTable(event: TableEvent) {
    switch (event.action) {
      case 'triggerAllCheckbox':
        for (let index = 0; index < this.patientDB.length; index++) {
          this.patientDB[index].checked = event.data;
          this.addOrRemovePatient(this.patientDB[index])
        }
        this.tableMaterialLayoutComponent.renderRows(this.patientDB);
        break;
      case 'triggerCheckbox':
        this.changePatient(event)
        break;
      case 'triggerDialog':
        this.openDialog()
        break;
      default:
        break;
    }
  }

  /**
   * METHODS
   */
  changePatient(event: TableEvent){
    this.patientDB[event.data].checked = !this.patientDB[event.data].checked;
    this.addOrRemovePatient(this.patientDB[event.data])
    this.tableMaterialLayoutComponent.renderRows(this.patientDB);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPatientSelectedComponent, {
      width: '80wv',
      height: '80wv',
      data: {patientSelecteds: this.patientSelected, displayedColumns: this.displayedColumnsModal },
      panelClass: 'fullscreen-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  addOrRemovePatient(patient: IPatient){
    const index = this.patientSelected.findIndex(x => x.Nombre == patient.Nombre && x.Apellido == patient.Apellido && x.Identificacion == patient.Identificacion)
    this.addOrRemove(index, patient.checked, patient)
  }
  addOrRemove(index: number, checked: boolean | undefined, patient: IPatient){
    if (!checked && index >= 0) {
      this.patientSelected.splice(index, 1)
    } else if (checked && index == -1){
      this.patientSelected.push(patient)
    }
  }
}
