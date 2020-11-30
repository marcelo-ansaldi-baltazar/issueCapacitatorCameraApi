import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-l-atenciones-pacientes',
  templateUrl: './l-atenciones-pacientes.page.html',
  styleUrls: ['./l-atenciones-pacientes.page.scss'],
})
export class LAtencionesPacientesPage implements OnInit {

  user = null;
  atenciones: any[];
  fechas: any[];
  pacientes: any[]; // ARRAY DE PACIENTES FILT QUE DEVOLVERÁ EL SELECT 
  paciente: any; // EMPLEADO QUE SE ELIGIRÁ EN EL SELECT
  empleadoSubscription: Subscription; // SUBSCRIPCIÓN A LA FUNCION ASYNCRONA QUE BUSCA LOS PACIENTES (SOLO SE UTILIZA EN LA BÚSQUEDA)

  constructor(
    private authService: AuthService,
    private atencionesService: AtencionesService,
    private router: Router,
    private browser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.atencionesService.getPacientes(this.user.ID_PERSONA).subscribe(res => {
      //console.log(res);
      this.atencionesService.pacientes = res;
      console.log(this.atencionesService.pacientes);
    }, (err) => {
      console.warn(err);
    });
  }

  buscarPacientes(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();
    // Close any running subscription.
    if (this.empleadoSubscription) {
      this.empleadoSubscription.unsubscribe();
    }
    if (!text) {
      // Close any running subscription.
      if (this.empleadoSubscription) {
        this.empleadoSubscription.unsubscribe();
      }
      event.component.items = [];
      event.component.endSearch();
      return;
    }
    this.empleadoSubscription = this.atencionesService.getPacientesAsync().subscribe(pacientes => {
      // Subscription will be closed when unsubscribed manually.
      if (this.empleadoSubscription.closed) {
        return;
      }
      event.component.items = this.filtrarPacientes(pacientes, text);
      event.component.endSearch();
    });
  }

  filtrarPacientes(pacientes: any[], text: string) {
    return pacientes.filter(paciente => {
      return paciente.NOMBRE_COMPLETO.toLowerCase().indexOf(text) !== -1 ||
      paciente.RUT.indexOf(text) !== -1;
    });
  }

  getAtencionesPaciente() {
    this.atencionesService.getAtencionesPaciente(this.paciente.ID_PERSONA).subscribe(res => {
      // this gives an object with dates as keys
      const groups = res.reduce((groups, atencion) => {
        let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        let fechaString = atencion.FECHA.split('-')[0] + " de " + months[+atencion.FECHA.split('-')[1] - 1] + " de " + atencion.FECHA.split('-')[2]
        const date = fechaString;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(atencion);
        return groups;
      }, {})
      // add it in the array format instead
      const groupArrays = Object.keys(groups).map((fecha) => {
        return {
          fecha,
          detalles: groups[fecha]
        };
      });
      this.atenciones = groupArrays;
      //console.log(this.atenciones);
    }, (err) => {
      console.warn(err);
    });
  }

  abrirPDF(url) {
    console.log("url: " + url);
    // const options: InAppBrowserOptions = {
    //   zoom: 'no',
    //   location: 'no',
    //   toolbar: 'no',
    //   hidden: 'yes',
    //   hideurlbar: 'yes',
    //   toolbarposition: 'bottom'
    // }
    this.browser.create(encodeURI(url), '_system', 'location=yes')
  }

  goToMedicosIndex() {
    this.router.navigate(['/index-medicos']);
  }
}
