import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurnosPageRoutingModule } from './turnos-routing.module';

import { TurnosPage } from './turnos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurnosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TurnosPage]
})
export class TurnosPageModule {}
