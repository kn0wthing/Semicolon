import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/users.service";
import { Router } from "@angular/router";
import { Profile } from "../../models/profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  public profile: Profile;

  constructor(private userService: UserService, private router: Router) {}
 
  ngOnInit() {
    this.profile = this.userService.getProfile();
  }

  public logout(): void {
    this.userService.clearUser();
    this.router.navigateByUrl("/login");
  }
}
