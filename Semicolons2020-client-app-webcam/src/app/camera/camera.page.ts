import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { CameraService } from '../services/camera.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  isLoading: boolean;

  constructor(private patientService: PatientService) {}
  imgurl = '';
  title = 'webCamDemo';
  randomid = 1;
  public verified: any;
  // latest snapshot
  public webcamImage: WebcamImage = null;
  public imageUrl: string;
  public apifetched: boolean;
  public ticket: string;
  public response: string;
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.imgurl = webcamImage.imageAsDataUrl;
    this.randomid = Math.random();
  }
  ngOnInit(): void {}
  verifyUser() {
    this.isLoading = true;
    this.patientService.validateMask(localStorage.getItem("userId"), this.imgurl.replace('data:image/jpeg;base64,','')).subscribe((value) => {
      console.log(value.certified);
      this.response = value.message
      this.imageUrl = value.imageUrl + '?' + this.randomid;
      this.apifetched = true;
      this.isLoading = false;
      // alert('A certificate has been sent to your phone');
    }, error => {
      // alert("Internal Server error");
      this.isLoading = false;
    });
    console.log();
  }

  reset() {
    this.apifetched = false;
    this.webcamImage = null;
    this.ticket = '';
  }
}
