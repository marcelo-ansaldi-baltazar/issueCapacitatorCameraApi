import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-pacientes',
  templateUrl: './index-pacientes.page.html',
  styleUrls: ['./index-pacientes.page.scss'],
})

export class IndexPacientesPage implements OnInit {

  user = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.user.NOMBRE = this.formatearNombre(this.user.NOMBRE);
  }

  // ionViewWillEnter(){
  //   this.user = this.authService.getUsuario();
  // }
  
  formatearNombre(nombre: string) {
    return nombre.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  goToAtencionesPacientes() {
    this.router.navigate(['/l-atenciones']);
  }

  goToCotizarExamen2() {
    this.router.navigate(['/cotizar-examen']);
  }

  goToListadoCotizaciones(){
    this.router.navigate(['/l-cotizaciones']);
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

