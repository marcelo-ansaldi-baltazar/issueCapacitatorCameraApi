import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElegirPerfilPageRoutingModule } from './elegir-perfil-routing.module';

import { ElegirPerfilPage } from './elegir-perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ElegirPerfilPageRoutingModule,
  ],
  declarations: [ElegirPerfilPage]
})
export class ElegirPerfilPageModule {}
