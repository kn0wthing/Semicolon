import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportAccessPageRoutingModule } from './report-access-routing.module';

import { ReportAccessPage } from './report-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportAccessPageRoutingModule
  ],
  declarations: [ReportAccessPage]
})
export class ReportAccessPageModule {}
