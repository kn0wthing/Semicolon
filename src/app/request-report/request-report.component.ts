import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../services/hospital.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientRequest } from '../data-structures/patient-request.model';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.css']
})
export class RequestReportComponent implements OnInit {

  public requests: any;
  public isLoading: boolean = false;

  constructor(private hospitalService: HospitalService,
              private patientService: PatientService) { }

  displayedColumns: string[] = ['patientId', 'name', 'sex', 'email', 'contact', 'request_report'];
  dataSource = new MatTableDataSource(this.requests);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
      this.isLoading = true;
      this.hospitalService.getRequestsByHospital(localStorage.getItem('hospitalId'))
      .subscribe( (response: PatientRequest) => {
          this.isLoading = false;
          this.requests = response;
          this.dataSource = new MatTableDataSource(this.requests);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }, error => {
        this.isLoading = false;
        alert("Internal Server Error.");
      })
  }

  public requestReport(patientId: number, element): void{
      this.isLoading = true;
      this.patientService.requestPatientReports(patientId).subscribe(response =>{
        this.isLoading = false
        element.requested = true;
      }, error => {
        this.isLoading = false;
        alert("Internal Server Error.");
      })
  }

}
