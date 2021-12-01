import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private apiURL ='http://covid-management-api.us-e2.cloudhub.io/api/vaccine';
  constructor(private http: HttpClient) { }

  public vaccineRequest(postObj) {
      return this.http.post(`${this.apiURL}/request`,postObj)
  }

  public getVaccineStatus(patient_id) {
    return this.http.get(`${this.apiURL}/status?patient_id=${patient_id}`);
  }
}
