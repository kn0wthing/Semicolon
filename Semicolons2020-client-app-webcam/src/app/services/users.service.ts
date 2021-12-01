import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiURL: string =
    "https://covid-management-api.us-e2.cloudhub.io/api/";
  private pushnotificationid: string;
  private chatsessionid: string;

  constructor(private http: HttpClient) {}

  public setUserId(userId: string): void {
    localStorage.setItem("userId", userId);
  }

  public setUsername(userName: string): void {
    localStorage.setItem("userName", userName);
  }

  public getUserId(): string {
    return localStorage.getItem("userId") || "N";
  }

  public setChatSessionId(sessionId: string): void {
    this.chatsessionid = sessionId;
  }

  public getChatSessionId(): string {
    return this.chatsessionid;
  }

  public setProfile(profile: object): void {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  public getProfile(): any {
    return JSON.parse(localStorage.getItem("profile"));
  }

  public setPushNotificationId(pushNotId: string) {
    const currentUser = this.getUserId();
    return this.http.patch(`${this.apiURL}patient/${currentUser}`, {
      pushNotId,
    });
  }

  public getPushNotificationId() {
    return this.pushnotificationid;
  }

  public validateLogin(payload): Observable<any> {
    return this.http.post(`${this.apiURL}patient/login`, payload);
  }

  public clearUser(): void {
    localStorage.clear();
  }
}
