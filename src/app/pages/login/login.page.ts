import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  user = null;
  credentials = {
    usuario: '',
    contrasena: '',
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private browser: InAppBrowser,
    private keyboard: Keyboard,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUsuario();
  }

  login() {
    this.authService.login(this.credentials).subscribe(async res => {
      this.user = this.authService.getUsuario();      
      if (res) {
        //console.log("this.user.PERFIL: " + this.user.PERFIL);
        if (this.user.PERFIL === "MEDICO") this.router.navigateByUrl("/index-medicos");
        else if (this.user.PERFIL === "PACIENTE" || this.user.PERFIL === "ADMINISTRADOR") this.router.navigateByUrl("/index-pacientes");
      }
      else {
        this.datosErroneosAlert();
        this.router.navigateByUrl("/");
      }
    }, (err) => {
      console.log(err);
    });
  }

  abrirPoliticaPrivacidad() {
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
}

