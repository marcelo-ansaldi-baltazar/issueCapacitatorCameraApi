import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AtencionesService {

  public pacientes: any[];
  private atenciones: any[];

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  getAtencionesPaciente(id_persona: string): Observable<any> {
    const url = "https://ripit.cl:8772/atenciones/atencionesPaciente";
    // const url = 'https://cheultest.ripit.cl:8770/atenciones/atencionesPaciente';
    let params = new HttpParams().set('id_persona', id_persona);
    return this.http.get(url, { params }).pipe(
      map(results => {
        console.log(results);
        return results;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  // obtiene los empleados para buscarlos en el ionic-selectable
  getPacientes(id_medico): Observable<any> {
    const url = "https://ripit.cl:8772/atenciones/getPacientes";
    // const url = 'https://cheultest.ripit.cl:8770/atenciones/getPacientes';
    let params = new HttpParams().set('id_medico', id_medico.toString());
    return this.http.get(url, { params }).pipe(
      map(results => {
        return results;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  // obtiene los empleados que se buscaron con el ionic-selectable
  getPacientesAsync(page?: number, size?: number, timeout = 1000): Observable<any[]> {
    return new Observable<any[]>(observer => {
      observer.next(this.getPacientesSelect(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }


  getPacientesSelect(page?: number, size?: number): any[] {
    let pacientesFiltrados = [];
    this.pacientes.forEach(empleado => {
      pacientesFiltrados.push(empleado);
    });
    if (page && size) {
      pacientesFiltrados = pacientesFiltrados.slice((page - 1) * size, ((page - 1) * size) + size);
    }
    return pacientesFiltrados;
  }
}
