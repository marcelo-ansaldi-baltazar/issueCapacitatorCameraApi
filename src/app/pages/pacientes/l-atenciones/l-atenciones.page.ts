import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-l-atenciones',
  templateUrl: './l-atenciones.page.html',
  styleUrls: ['./l-atenciones.page.scss'],
})
export class LAtencionesPage implements OnInit {

  user = null;
  atenciones: any[];
  fechas: any[];

  constructor(
    private authService: AuthService,
    private atencionesService: AtencionesService,
    private router: Router,
    private browser: InAppBrowser,
    private alertController: AlertController
    //private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
    this.atencionesService.getAtencionesPaciente(this.user.ID_PERSONA).subscribe(res => {
      //console.log("res: ", res);
      // esto entrega un objeto donde cada fecha es una KEY del array, y por cada fecha hay un array de atenciones dentro
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
      // se transforma en formato array
      const groupArrays = Object.keys(groups).map((fecha) => {
        return {
          fecha,
          detalles: groups[fecha]
        };
      });
      this.atenciones = groupArrays;
      //this.atenciones[0].detalles[0].URL = null;
      //console.log(this.atenciones);
    }, (err) => {
      console.warn(err);
    });
  }

  abrirPDF(url) {
    // const options: InAppBrowserOptions = {
    //   zoom: 'no',
    //   location: 'no',
    //   toolbar: 'no',
    //   hidden: 'yes',
    //   hideurlbar: 'yes',
    //   toolbarposition: 'bottom'  
    // }
    if(url) this.browser.create(encodeURI(url), '_system', 'location=yes');
    else    this.noTieneArchivoAlert();
  }

  async noTieneArchivoAlert() {
    const alert = await this.alertController.create({
      header: 'Error: Archivo no existe',
      message: 'No existe archivo PDF asociado a los resultados de esta atención',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToPacientesIndex() {
    this.router.navigate(['/index-pacientes']);
  }
}

