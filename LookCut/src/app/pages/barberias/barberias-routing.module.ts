import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarberiasPage } from './barberias.page';

const routes: Routes = [
  {
    path: '',
    component: BarberiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarberiasPageRoutingModule {}
