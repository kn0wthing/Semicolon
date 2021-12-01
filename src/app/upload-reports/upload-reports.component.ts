import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.css']
})
export class UploadReportsComponent implements OnInit {
  files: any;
  public isLoading: boolean = false;
  patientId: string;
  report_type: string ="Blood Reports"
  public success: boolean = false

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    this.files = event.target.files;    
  }
  
  onUpload() {
    const formData = new FormData();
    formData.append('report_type',this.report_type);
    formData.append('report_attachment',this.files[0]);
    this.isLoading = true;
    this.patientService.uploadReport(formData,this.patientId).subscribe(response => {
      this.isLoading = false;
      this.success = true;
      console.log(response)
    }, error => {
      this.isLoading = false;
    })   
  }

}
