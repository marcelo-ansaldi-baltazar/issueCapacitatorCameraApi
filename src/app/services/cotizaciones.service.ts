import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  private cotizaciones: any[];

  constructor(
    private http: HttpClient
  ) { }

  getCotizacionesPaciente(id_persona: string): Observable<any>  {
    const url = 'https://ripit.cl:8772/cotizacion/getCotizacionesPaciente';
    // const url = 'https://cheultest.ripit.cl:8770/cotizacion/getCotizacionesPaciente';
    let params = new HttpParams({
      fromObject: {
        id_persona: id_persona
      }
    });
    return this.http.get(url, {params}).pipe(
      map(results => {
        return results;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  enviarCotizacion(formData: FormData): Observable<any>  {
    const url = 'https://ripit.cl:8772/cotizacion/agregarCotizacion';
    // const url = 'https://cheultest.ripit.cl:8770/cotizacion/agregarCotizacion';
    console.log("ANTES DEL POST");
    return this.http.post(url, formData).pipe(
      map(results => {
        return results;
      }),
      catchError(err => {
        console.warn("ERROR");
        return throwError(err);
      })
    );
  }
}
