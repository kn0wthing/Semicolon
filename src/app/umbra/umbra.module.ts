import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UmbraPageRoutingModule } from './umbra-routing.module';

import { UmbraPage } from './umbra.page';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UmbraPageRoutingModule,
    MatToolbarModule
  ],
  declarations: [UmbraPage], 
  providers: [
    Geolocation
  ]
})
export class UmbraPageModule {}
