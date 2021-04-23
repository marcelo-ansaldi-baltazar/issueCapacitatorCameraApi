import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-elegir-perfil',
  templateUrl: './elegir-perfil.page.html',
  styleUrls: ['./elegir-perfil.page.scss'],
})
export class ElegirPerfilPage implements OnInit {

  user = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.user.NOMBRE = this.formatearNombre(this.user.NOMBRE);
  }

  ionViewWillEnter(){
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

  goToMedicosIndex() {
    this.router.navigate(['/index-medicos']);
  }

  goToPacientesIndex() {
    this.router.navigate(['/index-pacientes']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
