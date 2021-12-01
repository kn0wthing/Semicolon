import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';

import { CameraPage } from './camera.page';
import {WebcamModule} from 'ngx-webcam';
import { WebcamComponent } from './webcam/webcam.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    IonicModule,
    CameraPageRoutingModule,
    WebcamModule
  ],
  declarations: [CameraPage,WebcamComponent]
})
export class CameraPageModule {}
