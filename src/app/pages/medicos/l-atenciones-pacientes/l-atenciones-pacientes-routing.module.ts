import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LAtencionesPacientesPage } from './l-atenciones-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: LAtencionesPacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LAtencionesPacientesPageRoutingModule {}
