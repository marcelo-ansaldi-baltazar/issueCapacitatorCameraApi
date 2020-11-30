import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexMedicosPage } from './index-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: IndexMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexMedicosPageRoutingModule {}
