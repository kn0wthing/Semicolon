import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CovidService {
  private apiURL = "https://covid-cfc.eu-gb.mybluemix.net/api";

  constructor(private http: HttpClient) {}

  public fetchHistoricalData(userId): Observable<any> {
    return this.http.get(`${this.apiURL}/covid/timeline/${userId}`);
  }

  public getNearbyZones(lat, long): Observable<any>{
    const data = {
      "lat": lat,
      "long": long,
      "radius":1000
    }
    return this.http.post(`${this.apiURL}/covid/nearby-zones`, data)
  }
}
