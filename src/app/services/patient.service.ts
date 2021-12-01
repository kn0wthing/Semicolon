import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiURL: string ="https://covid-management-api.us-e2.cloudhub.io/api/patient";
  constructor(private http: HttpClient) { }

  public requestPatientReports(patientId: number) {
      return this.http.get(`${this.apiURL}/${patientId}/report/request`);
  }
  public uploadReport(postObj, patientId) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiURL}/${patientId}/report`, postObj, {headers: headers})
  }
}
