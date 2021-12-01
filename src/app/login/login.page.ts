import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})

/*
username: field to represent username
password: field to represent password
isLoading: to show waiting state while authorizing
*/

export class LoginPage implements OnInit {
  public username: string;
  public password: string;
  public isLoading = false;

  constructor(private router: Router, private loginService: UserService) {}

  ngOnInit() {
    if (this.loginService.getUserId() !== "N") {
      // Redirect to Home if already logged in
      this.router.navigate(["/umbra/home"]);
    }
  }

  //method for authorization and authentcation
  public login(): void {
    this.isLoading = true;
    let loginPayload={
      email:this.username,
      password:this.password
    }
    this.loginService.validateLogin(loginPayload).subscribe(
      (res) => {
        this.isLoading = false;
        this.loginService.setUserId(res.patientId);
        this.loginService.setUsername(res.name);

        this.router.navigate(["/umbra/home"]);
      },
      (error) => {
        this.isLoading = false;
        alert("Invalid Credentials. Please try again!");
      }
    );
    // //Remove following 2 lines
    // this.isLoading = false;
    // this.router.navigate(["/umbra/home"]);
  }
}
