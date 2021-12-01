import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private apiURL: string =
    "https://covid-management-api.us-e2.cloudhub.io/api/";

  constructor(private http: HttpClient) {}

  public registerUser(data): Observable<any> {
    return this.http.post(`${this.apiURL}patient/register`, data);
  }
}
