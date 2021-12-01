import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleButton: boolean;
  hospitalName: string;
  constructor(private apiService: ApiService) {
    this.toggleButton = true;
  }
  ngOnInit(): void {
    this.hospitalName = localStorage.getItem('name');
  }

  toggleSidebar() {}
}
