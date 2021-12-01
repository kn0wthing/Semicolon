import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cities: object[];
  cases: object[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    // scales: { xAxes: [{}], yAxes: [{}] },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Day of visit',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Visitor Count',
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [
    '1 July',
    '2 July',
    '3 July',
    '4 July',
    '5 July',
    '6 July',
    '7 July',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[];


  imgurl = '';
  title = 'webCamDemo';
  randomid = 1;
  public verified: any;
  // latest snapshot
  public webcamImage: WebcamImage = null;
  public imageUrl: string;
  public apifetched: boolean;
  data: { labels: string[]; datasets: { label: string; data: number[]; fill: boolean; borderColor: string; }[]; };
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.imgurl = webcamImage.imageAsDataUrl;
    this.randomid = Math.random();
  }
  constructor(private apiService: ApiService) {
    this.imageUrl = '';
    this.apifetched = false;
    this.cities = [
      {
        city: 'Kolkata',
        active: true,
        cases: [
          {
            type: 'Total Confirmed Cases',
            total: 800,
            width: 90,
          },
          {
            type: 'Deaths',
            total: 80,
            width: 20,
          },
          {
            type: 'Cured',
            total: 20,
            width: 10,
          },
          {
            type: 'Active Cases',
            total: 30,
            width: 50,
          },
        ],
        charts: [
          { data: [6, 5, 8, 1, 5, 5, 4], label: 'Below 10' },
          { data: [28, 24, 30, 19, 26, 27, 30], label: '10-20' },
          { data: [6, 19, 28, 21, 26, 25, 20], label: '20-50' },
          { data: [2, 18, 20, 19, 26, 17, 20], label: 'Above 50' },
        ],
      },
      {
        city: 'Pune',
        active: false,
        cases: [
          {
            type: 'Total Confirmed Cases',
            total: 1000,
            width: 95,
          },
          {
            type: 'Deaths',
            total: 100,
            width: 30,
          },
          {
            type: 'Cured',
            total: 20,
            width: 40,
          },
          {
            type: 'Active Cases',
            total: 30,
            width: 50,
          },
        ],
        charts: [
          { data: [10, 15, 8, 1, 5, 5, 4], label: 'Below 10' },
          { data: [25, 20, 30, 19, 26, 27, 30], label: '10-20' },
          { data: [6, 19, 28, 21, 30, 25, 20], label: '20-50' },
          { data: [2, 18, 50, 19, 26, 17, 20], label: 'Above 50' },
        ],
      },
    ];
    this.getActiveCityCases();
    this.data = {
      labels: ['22 Nov', '23 Nov', '24 Nov', '25 Nov', '26 Nov', '27 Nov', '28 Nov'],
      datasets: [
          {
              label: 'age 0 to 10',
              data: [45, 59, 50, 21, 56, 55, 49],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
              label: 'age 11 to 50',
              data: [28, 48, 40, 19, 66, 27, 37],
              fill: false,
              borderColor: '#565656'
          },
          {
            label: 'above age 51',
            data: [20, 4, 36, 9, 26, 27, 21],
            fill: false,
            borderColor: 'red'
        }
      ]
  }
  }

  getActiveCityCases() {
    let tempCases;
    this.cities.map((value, index) => {
      if (value['active'] == true) {
        tempCases = value['cases'];
        this.barChartData = value['charts'];
        return;
      }
    });
    this.cases = tempCases;
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((value) => {
      console.log(value[0]);
    });
  }

  // verifyUser() {
  //   this.apiService
  //     .verifyUser(this.randomid, this.imgurl)
  //     .subscribe((value) => {
  //       console.log(value.certified);
  //       this.imageUrl = value.imageUrl + '?' + this.randomid;
  //       this.apifetched = true;
  //     });
  // }

  reset() {
    this.apifetched = false;
    this.webcamImage = null;
  }

  changeCity(city) {
    console.log(city);
    this.cities.map((value) => {
      value['active'] = false;
    });
    city['active'] = true;
    this.getActiveCityCases();
  }
}
