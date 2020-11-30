import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexMedicosPageRoutingModule } from './index-medicos-routing.module';

import { IndexMedicosPage } from './index-medicos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IndexMedicosPageRoutingModule
  ],
  declarations: [IndexMedicosPage]
})
export class IndexMedicosPageModule {}
