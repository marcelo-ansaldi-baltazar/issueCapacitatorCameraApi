import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean = false;
  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({message: "Cargando...", duration: 5000}).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    if (this.isLoading) {  
      this.isLoading = false;
      return await this.loadingCtrl.dismiss();
    }
    return null;
  }
}