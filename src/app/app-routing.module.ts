import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParkingComponent } from './parking/parking.component';
import { EntrycamComponent } from './entrycam/entrycam.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { RequestReportComponent } from './request-report/request-report.component';
import { ApprovedRequestsComponent } from './approved-requests/approved-requests.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { UploadReportsComponent } from './upload-reports/upload-reports.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'entrance',
    component: ParkingComponent,
  },
  {
    path: 'validate',
    component: EntrycamComponent,
  },
  {
    path: 'approve-request',
    component: RequestApprovalComponent
  },  
  {
    path: 'request-report',
    component: RequestReportComponent
  },
  {
    path: 'approved-vaccinations',
    component: ApprovedRequestsComponent
  },
  {
    path: 'rejected-vaccinations',
    component: RejectedRequestsComponent
  },
  {
    path: 'upload-reports',
    component: UploadReportsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
