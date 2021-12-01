import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.page.html",
  styleUrls: ["./certificate.page.scss"],
})
export class CertificatePage implements OnInit {
  date: Date;
  message: string;
  messageClass: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.date = new Date();
    const message = window.history.state.message;
    this.message = message;
    this.messageClass = message.includes("not")
      ? "text-danger"
      : "text-success";
  }
}
