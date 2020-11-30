import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

const TOKEN_KEY = 'access_token';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  isLoading: boolean = false;
  constructor(
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private toastCtrl: ToastController,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storage.get(TOKEN_KEY))
    .pipe(
      switchMap(token => {
        if (token) {
          request = request.clone({ headers: request.headers.set('access_token', token) });
        }
        //console.log('access_token: ', token);
        this.presentLoading();
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // Cerramos el loading en el fin de la llamada
              this.dismissLoading();
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            this.dismissLoading();
            // Presentamos un toast con el mensaje de error
            //this.presentErrorToast('Oops, ha habido un problema');
            return throwError(error);
          })
        );
      })
    );
  }

  // Presenta el toast con el error
  async presentErrorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'dark',
      cssClass: 'toast',
    });
    toast.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: "Cargando...",
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log());
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log());
  }
}