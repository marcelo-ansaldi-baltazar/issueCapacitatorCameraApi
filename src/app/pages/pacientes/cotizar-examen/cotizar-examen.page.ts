import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-cotizar-examen',
  templateUrl: './cotizar-examen.page.html',
  styleUrls: ['./cotizar-examen.page.scss'],
})

export class CotizarExamenPage implements OnInit {

  imagenes = [];
  PHOTO_STORAGE: string = "fotos";
  user = null;
  isLoading: boolean = false;

  constructor(
    private actionSheetController: ActionSheetController, 
    private router: Router,
    private cotizacionesService: CotizacionesService,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    private platform: Platform,
    private loadingService: LoadingService,
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    this.user = this.authService.getUsuario();
    await this.cargarFotoGuardada();
  }

  private async cargarFotoGuardada() {
    // Retrieve cached photo array data
    await this.loadingService.presentLoading();
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.imagenes = JSON.parse(photoList.value) || [];
    if(this.imagenes.length > 0) {
      const response = await fetch(this.imagenes[0].blobString);
      this.imagenes[0].blobData = await response.blob();
    }
    await this.loadingService.dismissLoading();
  }

  async adjuntarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione origen de la imagen',
      buttons: [{
        text: 'Elegir desde la galería',
        handler: async () => { this.obtenerFoto(CameraSource.Photos); }
      },
      {
        text: 'Abrir la cámara',
        handler: async () => { this.obtenerFoto(CameraSource.Camera); }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  private async obtenerFoto(origenFoto: CameraSource) {
    const capturedPhoto = await Camera.getPhoto({ 
      resultType: CameraResultType.Uri, 
      source: origenFoto,
      quality: 100,
      width: 1280,
      height: 720,
      saveToGallery: true 
    });
    await this.loadingService.presentLoading();
    // Save the picture and add it to photo collection
    const archivoImagenGuardada = await this.savePicture(capturedPhoto);
    this.imagenes.push(archivoImagenGuardada);
    Storage.set({ key: this.PHOTO_STORAGE, value: JSON.stringify(this.imagenes) });
    await this.loadingService.dismissLoading();
    return false;
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
    // Se crea el BLOB para enviar a la API
    const response = await fetch(cameraPhoto.webPath);
    const blob = await response.blob();
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({ path: fileName, data: base64Data, directory: FilesystemDirectory.Data });
    // Plataforma hybrid incluye iOS y Android
    if (this.platform.is('hybrid'))
    return { 
      filepath: savedFile.uri, 
      webviewPath: Capacitor.convertFileSrc(savedFile.uri), 
      blobData: blob, 
      blobString: cameraPhoto.webPath, 
      filename: fileName 
    };
    // El caso "else" es para el navegador web (lo utilizo para testear)
    else return { 
      filepath: fileName, 
      webviewPath: base64Data, 
      blobData: blob,
      blobString: cameraPhoto.webPath,
      filename: fileName 
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Plataforma hybrid incluye iOS y Android
    // Se lee el archivo en formato de base64
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({ path: cameraPhoto.path });
      return file.data;
      // El caso "else" es para el navegador web (lo utilizo para testear)
      // Se obtiene la foto, luego se lee como blob, y por ultimo se convierte a formato base64
    } else {
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Función solo utilizada en el caso de navegadores web
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async confirmBorrarImagen(imagen) {
    const alert = await this.alertController.create({
      message: '¿Desea eliminar la imagen adjuntada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        },
        {
          text: 'Ok',
          handler: async () => {
            this.borrarImagen(imagen);
          }
        }
      ]
    });
    await alert.present();
  }

  async borrarImagen(imagen) {
    const index: number = this.imagenes.indexOf(imagen);
    this.imagenes.splice(index, 1);
    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.imagenes)
    });
    // Delete photo file from filesystem
    const filename = imagen.filepath.substr(imagen.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
  }

  async confirmIniciarSubida() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea solicitar una cotización online con esta imagen y sus datos de paciente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        },
        {
          text: 'Ok',
          handler: async () => {
            const formData = new FormData();
            formData.append('file', this.imagenes[0].blobData, this.imagenes[0].filename);
            formData.append('ID_CLIENTE', this.user.ID_PERSONA);
            formData.append('ID_PREVISION', this.user.ID_PREVISION);
            formData.append('MAIL', this.user.MAIL);
            formData.append('NOMBRE', this.formatearNombre(this.user.NOMBRE));
            this.cotizacionesService.enviarCotizacion(formData).subscribe(res => {
              this.presentToast('Operación exitosa. La cotización será respondida a su correo electrónico: '+this.user.MAIL);
              this.borrarImagen(this.imagenes[0]);
            }, (err) => {
              console.warn(err);
            });
          }
        }
      ]
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
  
  formatearNombre(nombre: string) {
    return nombre.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  goToPacientesIndex() {
    this.router.navigate(['/index-pacientes']);
  }
}