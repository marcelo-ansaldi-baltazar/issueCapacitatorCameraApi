import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

@Component({
  selector: 'app-l-cotizaciones',
  templateUrl: './l-cotizaciones.page.html',
  styleUrls: ['./l-cotizaciones.page.scss'],
})

export class LCotizacionesPage implements OnInit {

  user = null;
  cotizaciones = [];

  constructor(
    private authService: AuthService,
    private router: Router, 
    private cotizacionesService: CotizacionesService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.cotizacionesService.getCotizacionesPaciente(this.user.ID_PERSONA).subscribe(res => {
      //console.log("res: ", res);
      this.cotizaciones = res;
    }, (err) => {
      console.warn(err);
    });
  }

  goToPacientesIndex() {
    this.router.navigate(['/index-pacientes']);
  }
}
