import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Router } from "@angular/router";
import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from "@capacitor/core";
import { UserService } from "../../services/users.service";
import { AlertController } from "@ionic/angular";
import { NewsService } from "src/app/services/news.service";
import { Plugins } from "@capacitor/core";
import { PatientService } from "src/app/services/patient.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { VaccineService } from "src/app/services/vaccine.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels
} from "ng-apexcharts";
const { PushNotifications } = Plugins;
const { BluetoothService } = Plugins;


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})

/*
search: Variable to search and bind user's search value.
sessionId: to store sessionId
productsData: malls Data fetch from API after preforming search
showBanner: To hide and show top image banner
isLoading: To show waiting loader while fetching data from API
newsList: to store latest covid news fetch from API
*/
export class HomePage implements OnInit {
  public search: string;
  private sessionId: string;
  public productsData;
  public showBanner: boolean = true;
  public isLoading: boolean = false;
  public newsList: any;
  files: any;
  public patient_id: string;
  latitude: number;
  longitude: number;
  public vaccine_status: string;
  public report_status: any = [];
  userName: string;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions:Partial<ChartOptions>;

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private router: Router,
    private patientService: PatientService,
    private geolocation: Geolocation,
    private vaccineService: VaccineService
  ) {
  }

  ngOnInit(): void {
    this.patient_id = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");

    this.isLoading = true;
    this.vaccineService.getVaccineStatus(this.patient_id).subscribe(
      response => {
        this.isLoading = false;
        this.vaccine_status = response["status"];
      },
      error => {
        this.isLoading = false;
        alert("Internal server error");
      }
    );

    this.isLoading = true;
    this.patientService.getReportStatus(this.patient_id).subscribe(
      response => {
        this.isLoading = false;
        this.report_status = response;
      },
      error => {
        this.isLoading = false;
        alert("Internal server error");
      }
    );

    this.loadChart();    

    // push notification
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        PushNotifications.register();
      } else {
        alert("Error occured!");
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      (token: PushNotificationToken) => {
        this.userService.setPushNotificationId(token.value).subscribe(value => {
          console.log("Push Notification Added");
        });
      }
    );

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        console.log("Push received: " + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: PushNotificationActionPerformed) => {
        const pushNotification = notification.notification.data;
        console.log("tk", pushNotification);
        let that = this;
        this.showAlert(pushNotification.work, pushNotification.title, function () {
          if (pushNotification.work_id == "REPORT_ACCESS") {
            that.router.navigate(["/report-access"], {
              state: { message: pushNotification.work },
            });
          }
          else if (pushNotification.work_id == "VACCINE_APROVED") {
            that.router.navigate(["/approved"], {
              state: { message: pushNotification.work },
            });
          }
        });
      }
    );
  }

  onFileChanged(event: any, report_type) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append("report_type", report_type);
    formData.append("report_attachment", this.files[0]);
    this.isLoading = true;
    this.patientService.uploadReport(formData, this.patient_id).subscribe(
      response => {
        this.isLoading = false;
        this.patientService.getReportStatus(this.patient_id).subscribe(
          response => {
            this.report_status = response;
          },
          error => {
            alert("Internal server error");
          }
        );
        console.log(response);
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  public requestVaccination(): void {
    this.geolocation.getCurrentPosition().then(resp => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let postObj = {
        patientId: this.patient_id,
        latitude: this.latitude,
        longitude: this.longitude
      };

      this.isLoading = true;

      this.vaccineService.vaccineRequest(postObj).subscribe(
        response => {
          this.vaccineService.getVaccineStatus(this.patient_id).subscribe(
            response => {
              this.isLoading = false;
              this.vaccine_status = response["status"];
            },
            error => {
              this.isLoading = false;
              alert("Internal server error");
            }
          );
        },
        error => {
          this.isLoading = false;
        }
      );
    });
  }

  // common method to show alert
  async showAlert(message, header, callback) {
    const alert = await this.alertController.create({
      cssClass: "alertCustomCss",
      header: header,
      message,
      buttons: [
        {
          text: "Continue",
          handler: () => {
            callback();
          }
        },
        {
          text: "Cancel",
          handler: () => {
            return false;
          }
        }
      ]
    });
    await alert.present();
  }

  // To scan using bluetooth whether user is maintaining social distance or not
  async startScanning() {
    await BluetoothService.startScanning();
  }


  loadChart(){
    this.chartOptions = {
      series: [
        {
          name: "Positive Cases",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Active Cases",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 200,
        type: "area",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2020-11-28",
          "2020-11-29",
          "2020-11-30",
          "2020-12-01",
          "2020-12-02",
          "2020-12-03",
          "2020-12-04"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy"
        }
      }
    };
  }

  public logout(): void {
    this.userService.clearUser();
    this.router.navigateByUrl("/login");
  }

  public refresh(): void {
    this.ngOnInit();
  }
  
}
