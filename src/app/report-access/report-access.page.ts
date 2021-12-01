import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-access',
  templateUrl: './report-access.page.html',
  styleUrls: ['./report-access.page.scss'],
})
export class ReportAccessPage implements OnInit {

  private patient_id : string;
  isLoading: boolean = false;

  constructor(private patientService:PatientService,
    private router: Router) { }

  ngOnInit() {
    this.patient_id = localStorage.getItem('userId');;
  }

  denyRequest() {
    this.isLoading = true;
      this.patientService.rejectReportAccess(this.patient_id).subscribe (res => {
          this.isLoading = false;
          this.router.navigate(['/umbra/home']);
      }, error =>{
        this.isLoading = false;
      })
  }
  
  approveRequest() {
    this.isLoading = true;
    this.patientService.approveReportAccess(this.patient_id).subscribe (res => {
       this.isLoading = false;
       this.router.navigate(['/umbra/home']);
    }, error =>{
      this.isLoading = false;
    })
  }

}
