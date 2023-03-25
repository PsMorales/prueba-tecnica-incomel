import { Observable } from 'rxjs';
import { Inicio, RegistroInicio } from './../models/modelos';
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

  ServerInicioDeSesion(inicio: Inicio): Observable<Array<RegistroInicio>>{
    const url = `${environment.AUTH_SERVER}inicio-sesion`;
    return this.HttpClient.post<Array<RegistroInicio>>(url, inicio); 
  }
}