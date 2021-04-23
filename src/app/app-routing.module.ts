import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cotizar-examen',
    loadChildren: () => import('./pages/pacientes/cotizar-examen/cotizar-examen.module').then( m => m.CotizarExamenPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'l-atenciones',
    loadChildren: () => import('./pages/pacientes/l-atenciones/l-atenciones.module').then( m => m.LAtencionesPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'l-cotizaciones',
    loadChildren: () => import('./pages/pacientes/l-cotizaciones/l-cotizaciones.module').then( m => m.LCotizacionesPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'index-pacientes',
    loadChildren: () => import('./pages/pacientes/index-pacientes/index-pacientes.module').then( m => m.IndexPacientesPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'l-atenciones-pacientes',
    loadChildren: () => import('./pages/medicos/l-atenciones-pacientes/l-atenciones-pacientes.module').then( m => m.LAtencionesPacientesPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'index-medicos',
    loadChildren: () => import('./pages/medicos/index-medicos/index-medicos.module').then( m => m.IndexMedicosPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'elegir-perfil',
    loadChildren: () => import('./pages/elegir-perfil/elegir-perfil.module').then( m => m.ElegirPerfilPageModule),
    canActivate: [AuthGuard],
    data:{
      role:"ADMIN"
    }
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./pages/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
