import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarberiasPageRoutingModule } from './barberias-routing.module';

import { BarberiasPage } from './barberias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarberiasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BarberiasPage]
})
export class BarberiasPageModule {}
