import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertController,
  ) {
    this.user = this.authService.getUsuario();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = next.data.role; // data es un parámetro de la ruta actual (app-routing.module.ts)
    //console.log("this.user auth guard: ", this.user);
    return this.authService.user.pipe(
      take(1),
      map(user => {
        //console.log("observable user: ", user);
        // si el observable "user" del servicio de autenticación esta vacio
        if (!user) {
          console.log("!user!user!user!user!user!user!user!user!user!user!user");
          this.alertNoAutorizado();
          this.router.navigateByUrl('/');
          return false;
        }
        else {
          return true;
          /*
          if (expectedRole === this.user.rol) {
            return true;
          } else {
            console.warn(`El rol esperado: ${expectedRole} es distinto al rol de usuario actual: ${this.user.rol}`);
            this.alertNoAutorizado();
            this.router.navigateByUrl('/');
          }
          */
        }
      })
    );  
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  async alertNoAutorizado() {
    let alert = await this.alert.create({
      header: 'Sin autorización',
      message: 'Su rol de usuario no cuenta con la autorización para visitar esta página.',
      buttons: ['OK']
    });
    alert.present();
  }

}
