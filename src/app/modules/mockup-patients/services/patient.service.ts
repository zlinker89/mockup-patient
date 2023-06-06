import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IPatient, IResponseCRM } from '../interfaces/ipatient';
import { IWorkFlow } from '../interfaces/iwork-flow';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('URL_GOS') private readonly URL_GOS: string,
    @Inject('URL_AVU') private readonly URL_AVU: string
  ) {}

  getPatients(startDate: string, endDate: string): Promise<IPatient[]> {
    const patients$ = this.httpClient.get<IPatient[]>(
      `${this.URL_GOS}/contacts/${startDate}/to/${endDate}`
    );
    return lastValueFrom(patients$);
  }

  getWorkFlows() {
    const workFlows$ = this.httpClient.get<IWorkFlow[]>(
      `${this.URL_AVU}/api/workflows`
    );
    return lastValueFrom(workFlows$);
  }

  sendContacts(data: { contacts: any[] }) {
    const result$ = this.httpClient.post<IResponseCRM>(
      `${this.URL_AVU}/api/contact/store`,
      data
    );
    return lastValueFrom(result$);
  }
}
