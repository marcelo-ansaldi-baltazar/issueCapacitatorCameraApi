import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  private mail: string = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goToLogin(): void {
    this.router.navigateByUrl("/");
  }

  recuperarCredenciales():void {
    this.authService.recuperarCredenciales(this.mail).subscribe(res => {
      if (res.status === 204 ) this.mailSinUsuarioExistente();
      else this.presentToast('Operación exitosa. Se han enviado las credenciales de usuario a su correo electrónico');
      // }
    }, (err) => {
      console.log("Error en el servidor, comuniquese con el laboratorio");  
    });
  }

  async mailSinUsuarioExistente() {
    const alert = await this.alertController.create({
      header: 'Cuenta de usuario inexistente',
      message: 'No existen credencialess de usuario asociadas a este correo electrónico.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 8000
    });
    toast.present();
  }

}
