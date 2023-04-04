import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPatient } from '../../interfaces/ipatient';
import { ColumnTableMaterialLayout } from '../table-material-layout/interfaces/table.interfaces';
import { TableMaterialLayoutComponent } from '../table-material-layout/table-material-layout.component';
import { PatientService } from '../../services/patient.service';
import { IWorkFlow } from '../../interfaces/iwork-flow';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

export interface DialogData {
  patientSelecteds: IPatient[];
  displayedColumns: ColumnTableMaterialLayout[];
}
@Component({
  selector: 'app-dialog-patient-selected',
  templateUrl: './dialog-patient-selected.component.html',
  styleUrls: ['./dialog-patient-selected.component.css']
})
export class DialogPatientSelectedComponent implements OnInit, AfterViewInit {
  @ViewChild(TableMaterialLayoutComponent) tableMaterialLayoutComponent!: TableMaterialLayoutComponent;
  patientSelecteds: IPatient[] = [];
  displayedColumns: ColumnTableMaterialLayout[] = [];
  workFlows: IWorkFlow[] = []
  isLoading = false
  tipoEnvio: string = 'Contacto'
  constructor(public dialogRef: MatDialogRef<DialogPatientSelectedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private _patientService: PatientService) { }

  ngOnInit(): void {
    this.getWorkFlows()
  }

  async getWorkFlows(){
    this.workFlows = await this._patientService.getWorkFlows()
  }
  ngAfterViewInit(){
    this.isLoading = false
    this.patientSelecteds = this.data.patientSelecteds
    this.displayedColumns = this.data.displayedColumns
    this.tableMaterialLayoutComponent.renderRows(this.data.patientSelecteds)
  }

  /**
   * METHODs
   */
  async sendPatients(){
    this.correccionFechas()
    if (this.tipoEnvio == 'Contacto') {
      this.isLoading = true
      const obj = {
        contacts: this.patientSelecteds
      }
      try {
        const result = await this._patientService.sendContacts(obj)
        this.openDialog('Enhorabuena!', `Se han insertado: ${result.nroContactosInsertados}, Actualizado: ${result.nroContactosActualizados} y omitido: ${result.nroOmitidos}`)
      } catch (error) {
        this.openDialog('Error', 'Ha ocurrido un error al enviar la informacion a la base de datos: ' + JSON.stringify(error))
      } finally {
        this.isLoading = false
        this.dialogRef.close()
      }
    }
  }

  private correccionFechas() {
    for (let index = 0; index < this.patientSelecteds.length; index++) {
      if (this.patientSelecteds[index].CitaVencida) {
        this.patientSelecteds[index].CitaVencida = this.patientSelecteds[index].CitaVencida.replace('Z', '');
        this.patientSelecteds[index].CitaVencida = this.patientSelecteds[index].CitaVencida.replace('T', ' ');
      } else {
        this.patientSelecteds[index].CitaVencida = ''
      }
      if (this.patientSelecteds[index].ProximaCitaCita) {
        this.patientSelecteds[index].ProximaCitaCita = this.patientSelecteds[index].ProximaCitaCita.replace('Z', '');
        this.patientSelecteds[index].ProximaCitaCita = this.patientSelecteds[index].ProximaCitaCita.replace('T', ' ');
      } else {
        this.patientSelecteds[index].ProximaCitaCita = ''
      }
    }
  }

  private openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '40wv',
      height: '40wv',
      data: {title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
