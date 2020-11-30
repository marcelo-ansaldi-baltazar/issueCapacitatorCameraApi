import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LCotizacionesPage } from './l-cotizaciones.page';

const routes: Routes = [
  {
    path: '',
    component: LCotizacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LCotizacionesPageRoutingModule {}
