import { Observable } from 'rxjs';
import { Inicio, RegistroInicio, Usuario } from './../models/modelos';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  obtenerUsuarios(data: any): Observable<Array<Usuario>>{
    const url = `${environment.AUTH_SERVER}obtener-usuarios`;
    return this.HttpClient.post<Array<Usuario>>(url, data); 
  }

  obtenerDaosUsuario(data: any): Observable<Array<Usuario>>{
    const url = `${environment.AUTH_SERVER}obtener-datos-usuario`;
    return this.HttpClient.post<Array<Usuario>>(url, data); 
  }

  agregarUsuario(data: Usuario): Observable<Array<Usuario>>{
    const url = `${environment.AUTH_SERVER}agregar-usuario`;
    return this.HttpClient.post<Array<Usuario>>(url, data); 
  }

  actualizarUsuario(data: Usuario): Observable<Usuario>{
    const url = `${environment.AUTH_SERVER}actualizar-usuario`;
    return this.HttpClient.post<Usuario>(url, data); 
  }

  eliminarUsuario(data: any): Observable<Usuario>{
    const url = `${environment.AUTH_SERVER}eliminar-usuario`;
    return this.HttpClient.post<Usuario>(url, data); 
  }
}