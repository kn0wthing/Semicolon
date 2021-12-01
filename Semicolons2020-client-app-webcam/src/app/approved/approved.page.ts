import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as confetti from 'canvas-confetti';
import { PatientService } from '../services/patient.service';

declare var H: any;

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {
  mapView:boolean=false;
  private platform: any;
  public map: any;
  private lat: any;
  private long: any;
  public appointment : any;
  isLoading: boolean;

  constructor(private _snackBar: MatSnackBar, private patientService: PatientService) {}

  ngOnInit() {
    this.fireConfetti();
    this.isLoading = true
    this.patientService.getVaccineDetails(localStorage.getItem("userId")).subscribe(res => {
        this.appointment = res;
        this.appointment.dateVal = res['time'].split('T')[0]
        this.appointment.timeVal = res['time'].split('T')[1].replace('Z','');
        this.isLoading = false;
    }, error => {
      this.isLoading = false;
      alert("Error")
    })
  }

  viewMap(){
    this.lat=this.appointment.latitude;
    this.long= this.appointment.longitude;
    this.mapView=true;
    setTimeout(()=>{
    this.loadMap();
    },500);
  }

  setReminder(){
    this._snackBar.open('Reminder saved!','OK', {
      duration: 2000,
    });
  }

  loadMap(): void {

    this.platform = new H.service.Platform({
      apikey: "yRcz-0_gRnl3AKUShWXf6HSY9wObwmppHWxqr4xOj8k",
    });

    var defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.raster.normal.map,
      {
        zoom: 18,
        center: { lat: this.lat, lng: this.long},
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    var pngIcon = new H.map.Icon('../../assets/placeholder.png');
    var hospitalMarker = new H.map.Marker({lat: this.lat, lng: this.long},{
      icon: pngIcon
    });
    map.addObject(hospitalMarker);

    window.addEventListener("resize", () => map.getViewPort().resize());
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);
  }


  fakeSave(){
    this._snackBar.open('Location Saved on Google Maps!','OK', {
      duration: 2000,
    });
  }

  
  fireConfetti(){
    confetti.create()({
      shapes: ['square','circle'],
      particleCount: 400,
      spread: 80,
      origin: {
        y: (3),
        x: (1.2)
      },
      angle:90,
      zIndex:999999,
      gravity:0.5
    });
  }

}
