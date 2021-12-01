import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UmbraPage } from './umbra.page';
import { CartComponent } from "./details/cart/cart.component";
import { QrpageComponent } from "./details/qrpage/qrpage.component";

const routes: Routes = [
  {
    path: '',
    component: UmbraPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../umbra/home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "details",
        loadChildren: () =>
          import("../umbra/details/details.module").then((m) => m.DetailsPageModule),
      },
      {
        path: 'chatbot',
        loadChildren: () => import('./chatbot/chatbot.module').then( m => m.ChatbotPageModule)
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../umbra/profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "certificate",
        loadChildren: () =>
          import("../umbra/certificate/certificate.module").then(
            (m) => m.CertificatePageModule
          ),
      },
      {
        path: 'social-distancing',
        loadChildren: () => import('./social-distancing/social-distancing.module').then( m => m.SocialDistancingPageModule)
      },
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "qr",
        component: QrpageComponent,
      }
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UmbraPageRoutingModule {}
