import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   username : string;
   password : string
  isLoading: boolean;
  constructor(private router : Router, private hospitalService: HospitalService) { }

  ngOnInit() {
  }

  logIn(){
    let postObj = {
      "email": this.username,
      "password": this.password
    }
    this.isLoading = true;
    this.hospitalService.login(postObj).subscribe(res => {
      this.isLoading = false;
      localStorage.setItem('name',res['name']);
      localStorage.setItem('hospitalId',res['hospitalId'] )
      this.router.navigate(['/home'])
    }, error => {
      this.isLoading = false;
    })

   
  }

}
