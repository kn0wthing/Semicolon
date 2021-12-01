import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientRequest } from '../data-structures/patient-request.model';
import { Observable } from 'rxjs';
import { Requests } from '../data-structures/requests.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private apiURL: string = 'https://covid-management-api.us-e2.cloudhub.io/api/hospital'

  constructor(private http: HttpClient) { }

  public login(postObj) {
    return this.http.post(`${this.apiURL}/login`, postObj);
  }

  public getRequestsByHospital(hospitalId: string): Observable<PatientRequest> {
      return this.http.get<PatientRequest>(`${this.apiURL}/${hospitalId}/requests`);
  }

  public getInitiatedRequestes(hospitalId: string): Observable<Requests> {
      return this.http.get<Requests>(`${this.apiURL}/${hospitalId}/requests/initiated`);
  }

  public getApprovedRequestes(hospitalId: string): Observable<Requests> {
    return this.http.get<Requests>(`${this.apiURL}/${hospitalId}/requests/approved`);
  }

  public getRejectedRequestes(hospitalId: string): Observable<Requests> {
    return this.http.get<Requests>(`${this.apiURL}/${hospitalId}/requests/rejected`);
  }
}
