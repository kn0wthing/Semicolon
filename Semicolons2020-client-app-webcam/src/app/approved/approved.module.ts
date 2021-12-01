import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedPageRoutingModule } from './approved-routing.module';
import {MatIconModule} from '@angular/material/icon';

import { ApprovedPage } from './approved.page';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovedPageRoutingModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ApprovedPage]
})
export class ApprovedPageModule {}
