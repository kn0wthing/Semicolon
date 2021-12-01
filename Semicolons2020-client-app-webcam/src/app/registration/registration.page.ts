import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RegistrationService } from '../services/registration.service';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

/*
firstFormGroup: Form group for primary details
secondFormGroup: Form group to set password
latitude: latitude of user location
logitude: logitude of user location
showSuccess: To show success message after successful registration
isLoading: To show waiting while backend request is in progress
*/


export class RegistrationPage implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  latitude: number;
  longitude: number;
  showSuccess : boolean = false;
  isLoading : boolean = false;
  codes = [
    {value: '+91'},
    {value: '+92'},
    {value: '+93'},
    {value: '+94'},
    {value: '+95'}
  ];
  selectedCode = this.codes[0].value;
  email:string='';
  password:string='';
  mobileNumber:string='';
  name:string='';
  age:string='';
  sex:'Male'|'Female';
  address:string='';
  occupation:string='';
  step=1;

  constructor(private _formBuilder: FormBuilder,private geolocation: Geolocation,private registrationService: RegistrationService ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required,Validators.email]],
      'contact': ['', [Validators.required,Validators.minLength(10)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    });
    
  }


  // To register user using latitude, longitude and filled form data
  public registerUser(): void {
    this.isLoading = true;
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      let postObj = {
        name: this.firstFormGroup.get('name').value,
        email: this.firstFormGroup.get('email').value,
        contact: this.firstFormGroup.get('contact').value,
        password: this.secondFormGroup.get('password').value,
        latitude: this.latitude,
        longitude: this.longitude
      }

      this.registrationService.registerUser(postObj).subscribe(res=>{
        this.showSuccess= true;
        this.isLoading = false;
      },error =>{
        this.isLoading = false;
        alert("Internal server error")
      })

    }).catch((error) => {
      this.isLoading = false;
      alert('Error getting location' + JSON.stringify(error));
    });   
  }

  nextStep(){
    if(this.step!=8)  this.step+=1;
  }

  previousStep(){
    this.step-=1;
  }

  fireConfetti(){
    confetti.create()({
      shapes: ['square'],
      particleCount: 200,
      spread: 70,
      origin: {
          y: (3),
          x: (0.6)
      }
    });
  }

  register(){
    this.isLoading = true;
    let payload={
      email:'',
      password:'',
      name:'',
      contact:'',
      sex:'',
      age:0,
      occupation:'',
      address:''
    }
    
    payload.email=this.email;
    payload.password=this.password;
    payload.name=this.name;
    payload.contact=this.selectedCode+this.mobileNumber;
    payload.sex=this.sex;
    payload.age=Number(this.age);
    payload.address=this.address;
    payload.occupation=this.occupation;
    console.log(payload);

    this.registrationService.registerUser(payload).subscribe(res=>{
      this.showSuccess= true;
      this.isLoading = false;
      this.step=9;
      this.fireConfetti();
    },error =>{
      this.isLoading = false;
      alert("Internal server error")
    })
  }
}
