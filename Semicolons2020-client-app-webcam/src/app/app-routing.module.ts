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
  // {
  //   path: "appointments",
  //   loadChildren: () =>
  //     import("./appointments/appointments.module").then(
  //       (m) => m.AppointmentsPageModule
  //     ),
  // },
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
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
