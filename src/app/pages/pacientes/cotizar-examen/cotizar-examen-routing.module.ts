import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizarExamenPage } from './cotizar-examen.page';

const routes: Routes = [
  {
    path: '',
    component: CotizarExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizarExamenPageRoutingModule {}
