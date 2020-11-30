import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LAtencionesPacientesPageRoutingModule } from './l-atenciones-pacientes-routing.module';

import { LAtencionesPacientesPage } from './l-atenciones-pacientes.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonicSelectableModule,
    LAtencionesPacientesPageRoutingModule
  ],
  declarations: [LAtencionesPacientesPage]
})
export class LAtencionesPacientesPageModule {}
