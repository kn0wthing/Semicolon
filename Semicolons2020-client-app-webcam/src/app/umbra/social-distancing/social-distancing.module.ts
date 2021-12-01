import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialDistancingPageRoutingModule } from './social-distancing-routing.module';

import { SocialDistancingPage } from './social-distancing.page';
import { MatStepperModule } from '@angular/material/stepper';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialDistancingPageRoutingModule,
    MatStepperModule,
    ChartsModule
  ],
  declarations: [SocialDistancingPage]
})
export class SocialDistancingPageModule {}
