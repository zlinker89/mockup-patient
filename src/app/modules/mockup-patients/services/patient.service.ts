import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IPatient } from '../interfaces/ipatient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  getPatients(startDate: string, endDate:string): Promise<IPatient[]> {
    const patients$ = this.httpClient.get<IPatient[]>(`https://81bc-181-143-74-238.ngrok.io/contacts/${startDate}/to/${endDate}`)
    return lastValueFrom(patients$)
  }
}
