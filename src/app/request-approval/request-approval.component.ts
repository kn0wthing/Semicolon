import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HospitalService } from '../services/hospital.service';
import { Requests } from '../data-structures/requests.model';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.css']
})
export class RequestApprovalComponent implements OnInit {


  constructor(private hospitalService: HospitalService,
              private vaccineService: VaccineService) { }

  displayedColumns: string[] = ['patientId', 'name', 'sex', 'email', 'contact', 'score', 'approve'];
  public isLoading: boolean = false;
  public requests: any;
  dataSource = new MatTableDataSource(this.requests);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.hospitalService.getInitiatedRequestes(localStorage.getItem('hospitalId'))
    .subscribe( (response: Requests) => {
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

  public approveRequest(element): void {
    let postObj = {
      "patientId": element.patient.patientId,
      "hostiptalId": Number(localStorage.getItem('hospitalId')),
      "vaccineDate": new Date().toISOString()
    }
    this.isLoading = true;
    this.vaccineService.approveVaccine(postObj).subscribe(response => {
      this.isLoading = false;
      element.vaccine_status = "approved"
    }, error => {
      this.isLoading = false;
      alert("Internal Server Error.");
    })

  }

}
