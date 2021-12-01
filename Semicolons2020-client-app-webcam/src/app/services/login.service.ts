import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL : string ="https://covid-cfc.eu-gb.mybluemix.net/api";

  constructor(private http: HttpClient) { }

  public validateLogin(email,password): Observable<any>{
    return this.http.get(`${this.apiURL}/users?email=${email}&password=${password}`);
  }
}
