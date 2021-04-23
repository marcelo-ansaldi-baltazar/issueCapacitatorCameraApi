import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { PopoverComponent } from '../../components/popover/popover.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  user = null;
  contraseniaVisible = false;
  iconoMostrarContrasenia = 'eye';
  credentials = {
    usuario: '',
    contrasena: '',
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private browser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
  }

  login(): void {
    this.authService.login(this.credentials).subscribe(async res => {
      this.user = this.authService.getUsuario();
      if (res) {
        //console.log("this.user.PERFIL: " + this.user.PERFIL);
        if (this.user.PERFIL === "MEDICO" || this.user.PERFIL === "MEDICO_ASOCIADO") this.router.navigateByUrl("/elegir-perfil");
        else if (this.user.PERFIL === "ADMINISTRADOR" ||
          this.user.PERFIL === "SECRETARIA" ||
          this.user.PERFIL === "PARAMEDICO" ||
          this.user.PERFIL === "PROFESIONAL" ||
          this.user.PERFIL === "SUPERVISOR" ||
          this.user.PERFIL === "EXTERNO" ||
          this.user.PERFIL === "PACIENTE") this.router.navigateByUrl("/index-pacientes");
        else console.log("error");
       // TODO : ALERTA PRA CUANDO EL USUARIO NO ES DE LOS TIPOS QUE CORRESPONDEN A LA APP
       // (this.user.PERFIL === "CONSULTOR EXTERNO" || this.user.PERFIL === "CONSULTOR CONVENIO" || this.user.PERFIL === "CONVENIO_MULTI_LOCAL") 
      }
      else {
        this.datosErroneosAlert();
        this.router.navigateByUrl("/");
      }
    }, (err) => {
      console.log(err);
    });
  }

  mostrarContrasenia(): void {
    this.contraseniaVisible = !this.contraseniaVisible;
    if (this.iconoMostrarContrasenia === 'eye') this.iconoMostrarContrasenia = 'eye-off';
    else this.iconoMostrarContrasenia = 'eye';
  }

  goToRecuperarContrasenia(): void {
    this.router.navigateByUrl("/recuperar-contrasenia");
  }

  abrirPoliticaPrivacidad(): void {
    const url = "https://www.laboratorioetcheverry.cl/politicas-de-privacidad-laboratorio-etcheverry/";
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
      toolbar: 'no',
      hidden: 'yes',
      hideurlbar: 'yes',
      toolbarposition: 'bottom'
    }
    this.browser.create(encodeURI(url), '_system', 'location=yes')
  }

  async datosErroneosAlert() {
    const alert = await this.alertController.create({
      header: 'Credenciales incorrectas',
      message: 'Las credenciales ingresadas son incorrectas. Por favor intenta nuevamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}

