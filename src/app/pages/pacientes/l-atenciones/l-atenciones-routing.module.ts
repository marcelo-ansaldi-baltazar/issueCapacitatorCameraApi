import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LAtencionesPage } from './l-atenciones.page';

const routes: Routes = [
  {
    path: '',
    component: LAtencionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LAtencionesPageRoutingModule {}
