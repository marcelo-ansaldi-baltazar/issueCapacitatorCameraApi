import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CotizarExamenPageRoutingModule } from './cotizar-examen-routing.module';

import { CotizarExamenPage } from './cotizar-examen.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CotizarExamenPageRoutingModule
  ],
  declarations: [CotizarExamenPage]
})
export class CotizarExamenPageModule {}
