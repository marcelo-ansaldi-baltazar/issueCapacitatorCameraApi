import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
  ) {
    this.loadStoredToken();
    /*
    this.user = this.userData.asObservable().pipe(
      filter(response => response)
    );
    */
  }

  loadStoredToken() {
    let platformObservable = from(this.platform.ready()); // READY() CONVIERTE UNA PROMESA EN UN OBSERVABLE (PARA HACERLE PIPE A LOS RESULTADOS)
    this.user = platformObservable.pipe(
      // switchmap es para suscribirse al nuevo observable
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY))
      }),
      map(token => {
        //console.log('token from storage: ', token);
        if (token) {
          let decoded = helper.decodeToken(token);
          //console.log('token decoded: ', decoded);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      }),
    )
    /*
    this.storage.get(TOKEN_KEY).then(data => {
      console.log('loaded user: ' + data)
      if (data) {
        this.userData.next(data);
      } else {
        this.userData.next({ email: null, role: null })
      }
    });
    */
  }

  login(credentials): Observable<any> {
    const url = 'https://ripit.cl:8772/login';
    // const url = 'https://cheultest.ripit.cl:8770/login';
    let body = {
      usuario: credentials.usuario,
      contrasena: credentials.contrasena
    }
    return this.http.post(url, body).pipe(
      take(1), // para que se tome solo el primer resultado, quizas no sea necesario
      map((results: any) => {
        //console.log("raw:", results);
        return results.token;
      }),
      switchMap(token => {
        //console.log("token: "+token);
        let decoded = helper.decodeToken(token);
        console.log('login decoded: ', decoded);
        this.userData.next(decoded);
        let storageObservable = from(this.storage.set(TOKEN_KEY, token));
        // queremos asegurarnos de que que el token se guarda en Storage antes del return de esta función
        return storageObservable;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  recuperarCredenciales(correo): Observable<any> {
    const url = 'https://ripit.cl:8772/recuperarCredenciales';
    // const url = 'https://cheultest.ripit.cl:8770/recuperarCredenciales';
    let body = { correo: correo }
    return this.http.post(url, body,  {observe: 'response'}).pipe(
      map(results => {
        console.log(results);
        return results;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getUsuario() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
