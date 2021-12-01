import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../services/hospital.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Requests } from '../data-structures/requests.model';

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrls: ['./rejected-requests.component.css']
})
export class RejectedRequestsComponent implements OnInit {

  constructor(private hospitalService: HospitalService) { }

  displayedColumns: string[] = ['patientId', 'name', 'sex', 'email', 'contact', 'score'];
  public isLoading: boolean = false;
  public requests: any;
  dataSource = new MatTableDataSource(this.requests);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.hospitalService.getRejectedRequestes(localStorage.getItem('hospitalId'))
      .subscribe((response: Requests) => {
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

}
