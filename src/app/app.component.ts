import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Route, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'social-distancing-web';
  visible: boolean;
  constructor(private apiService: ApiService, private router:Router, private location: Location) {
    // this.visible = true;
    router.events.subscribe((val) => {
      console.log(location.path());
      if(location.path() == '/login'){
        this.visible = false;
      }else {
        this.visible = true;
      }
    });
  }
}
