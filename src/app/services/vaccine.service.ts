import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private apiURL: string = "https://covid-management-api.us-e2.cloudhub.io/api/vaccine/approve";
  constructor(private http: HttpClient) { }

  public approveVaccine(postObj) {
    return this.http.post(this.apiURL,postObj);
  }
}
