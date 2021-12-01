import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {  ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    Geolocation
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
