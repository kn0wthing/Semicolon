import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private apiURL: string =
    "https://eu-gb.functions.cloud.ibm.com/api/v1/web/shabana_shaikh%40persistent.co.in_dev/default/covid-discovery.json";

  constructor(private http: HttpClient) {}

  public getNews(): Observable<any> {
    return this.http.get(`${this.apiURL}`);
  }
}
