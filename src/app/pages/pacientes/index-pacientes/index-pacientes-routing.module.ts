import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPacientesPage } from './index-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPacientesPageRoutingModule {}
