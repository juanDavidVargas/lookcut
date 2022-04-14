import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarberosPage } from './barberos.page';

const routes: Routes = [
  {
    path: '',
    component: BarberosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarberosPageRoutingModule {}
