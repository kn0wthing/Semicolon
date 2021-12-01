import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { WebcamImage } from 'ngx-webcam';
import { WebcamModule } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-entrycam',
  templateUrl: './entrycam.component.html',
  styleUrls: ['./entrycam.component.css'],
})
export class EntrycamComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  imgurl = '';
  title = 'webCamDemo';
  randomid = 1;
  public verified: any;
  // latest snapshot
  public webcamImage: WebcamImage = null;
  public imageUrl: string;
  public apifetched: boolean;
  public ticket: string;
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.imgurl = webcamImage.imageAsDataUrl;
    this.randomid = Math.random();
  }
  ngOnInit(): void {}
  verifyUser() {
    this.apiService.verifyUser(this.ticket, this.imgurl).subscribe((value) => {
      console.log(value.certified);
      this.imageUrl = value.imageUrl + '?' + this.randomid;
      this.apifetched = true;
      alert('A certificate has been sent to your phone');
    });
    console.log();
  }

  reset() {
    this.apifetched = false;
    this.webcamImage = null;
    this.ticket = '';
  }
}
