import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPacientesPageRoutingModule } from './index-pacientes-routing.module';

import { IndexPacientesPage } from './index-pacientes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IndexPacientesPageRoutingModule
  ],
  declarations: [IndexPacientesPage]
})
export class IndexPacientesPageModule {}
