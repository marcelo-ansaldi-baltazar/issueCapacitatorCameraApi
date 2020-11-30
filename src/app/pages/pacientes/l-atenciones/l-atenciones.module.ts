import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LAtencionesPageRoutingModule } from './l-atenciones-routing.module';

import { LAtencionesPage } from './l-atenciones.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    LAtencionesPageRoutingModule
  ],
  declarations: [LAtencionesPage]
})
export class LAtencionesPageModule {}
