import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroClientesPageRoutingModule } from './registro-clientes-routing.module';

import { RegistroClientesPage } from './registro-clientes.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroClientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroClientesPage]
})
export class RegistroClientesPageModule {}
