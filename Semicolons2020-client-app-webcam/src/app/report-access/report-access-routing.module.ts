import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportAccessPage } from './report-access.page';

const routes: Routes = [
  {
    path: '',
    component: ReportAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportAccessPageRoutingModule {}
