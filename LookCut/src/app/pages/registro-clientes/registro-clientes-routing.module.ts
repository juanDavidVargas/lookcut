import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroClientesPage } from './registro-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroClientesPageRoutingModule {}
