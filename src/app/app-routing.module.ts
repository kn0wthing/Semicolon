import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "umbra",
    loadChildren: () =>
      import("./umbra/umbra.module").then((m) => m.UmbraPageModule),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./registration/registration.module").then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: "approved",
    loadChildren: () =>
      import("./approved/approved.module").then(
        (m) => m.ApprovedPageModule
      ),
  },
  {
    path: "certificate",
    loadChildren: () =>
      import("./umbra/certificate/certificate-routing.module").then(
        (m) => m.CertificatePageRoutingModule
      ),
  },
  {
    path: 'approved',
    loadChildren: () => import('./approved/approved.module').then( m => m.ApprovedPageModule)
  },
  {
    path: 'report-access',
    loadChildren: () => import('./report-access/report-access.module').then( m => m.ReportAccessPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
