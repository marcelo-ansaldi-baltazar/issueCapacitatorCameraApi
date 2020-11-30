import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index-medicos',
  templateUrl: './index-medicos.page.html',
  styleUrls: ['./index-medicos.page.scss'],
})
export class IndexMedicosPage implements OnInit {

  user = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.user.NOMBRE = this.formatearNombre(this.user.NOMBRE);
  }

  formatearNombre(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  ionViewWillEnter(){
    this.user = this.authService.getUsuario();
  }

  goToAtencionesPacientes() {
    this.router.navigate(['/l-atenciones-pacientes']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}