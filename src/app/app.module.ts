import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { WebcamComponent } from './webcam/webcam/webcam.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParkingComponent } from './parking/parking.component';
import { EntrycamComponent } from './entrycam/entrycam.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestReportComponent } from './request-report/request-report.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { ApprovedRequestsComponent } from './approved-requests/approved-requests.component';
import { UploadReportsComponent } from './upload-reports/upload-reports.component';
import {ChartModule} from 'primeng/chart';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebcamComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ParkingComponent,
    EntrycamComponent,
    RequestApprovalComponent,
    RequestReportComponent,
    RejectedRequestsComponent,
    ApprovedRequestsComponent,
    UploadReportsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    ChartsModule,
    WebcamModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ChartModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
