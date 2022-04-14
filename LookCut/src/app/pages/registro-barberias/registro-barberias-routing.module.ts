import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroBarberiasPage } from './registro-barberias.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroBarberiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroBarberiasPageRoutingModule {}
