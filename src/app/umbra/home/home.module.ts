import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatInputModule,
    MatIconModule,
    ChartsModule,
    NgApexchartsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
