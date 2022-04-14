import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionBarberiasPageRoutingModule } from './edicion-barberias-routing.module';

import { EdicionBarberiasPage } from './edicion-barberias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionBarberiasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EdicionBarberiasPage]
})
export class EdicionBarberiasPageModule {}
