import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MatBadgeModule } from "@angular/material/badge";

import { SocialDistancingPage } from "./social-distancing.page";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

const routes: Routes = [
  {
    path: "",
    component: SocialDistancingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatBadgeModule],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class SocialDistancingPageRoutingModule {}
