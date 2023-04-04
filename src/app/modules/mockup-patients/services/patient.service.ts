import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IPatient, IResponseCRM } from '../interfaces/ipatient';
import { IWorkFlow } from '../interfaces/iwork-flow';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  getPatients(startDate: string, endDate:string): Promise<IPatient[]> {
    const patients$ = this.httpClient.get<IPatient[]>(`https://8066-181-143-74-238.ngrok.io/contacts/${startDate}/to/${endDate}`)
    return lastValueFrom(patients$)
  }

  getWorkFlows(){
    const workFlows$ = this.httpClient.get<IWorkFlow[]>(`https://api-update-vtiger.oralhome.com.co/api/workflows`)
    return lastValueFrom(workFlows$)
  }

  sendContacts(data: { contacts: any[]}){
    const result$ = this.httpClient.post<IResponseCRM>(`https://api-update-vtiger.oralhome.com.co/api/contact/store`, data)
    return lastValueFrom(result$)
  }
}
