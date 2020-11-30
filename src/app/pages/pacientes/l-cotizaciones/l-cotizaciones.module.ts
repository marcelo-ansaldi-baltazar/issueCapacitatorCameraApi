import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LCotizacionesPageRoutingModule } from './l-cotizaciones-routing.module';

import { LCotizacionesPage } from './l-cotizaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    LCotizacionesPageRoutingModule
  ],
  declarations: [LCotizacionesPage]
})
export class LCotizacionesPageModule {}
