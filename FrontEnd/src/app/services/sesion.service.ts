import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Inicio, RegistroInicio, Recuperar, Usuario, Cambio } from './../models/modelos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  public intentoDeAcceso = "";

  constructor(
    private HttpClient: HttpClient
  ) { }

  AlmacenarSessionStorage(datosUsuario: RegistroInicio){
    sessionStorage.setItem("SessionStarted", "1");
    sessionStorage.setItem("DatosUsuario", JSON.stringify(datosUsuario));
  }

  alert(icon: any, title: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: title
    })
  }

  ServerInicioDeSesion(inicio: Inicio): Observable<Array<RegistroInicio>>{
    const url = `${environment.AUTH_SERVER}inicio-sesion`;
    return this.HttpClient.post<Array<RegistroInicio>>(url, inicio); 
  }

  emailRecuperarContrasenia(recuperar: Recuperar): Observable<Array<any>>{
    const url = `${environment.AUTH_SERVER}recupera-contrasenia`;
    return this.HttpClient.post<Array<any>>(url, recuperar); 
  }

  cambiarContrasenia(cambio: Cambio): Observable<Array<any>>{
    const url = `${environment.AUTH_SERVER}cambiar-contrasenia`;
    return this.HttpClient.post<Array<any>>(url, cambio); 
  }

  getToken(): RegistroInicio{
    return JSON.parse(sessionStorage.getItem("DatosUsuario"));
  }

  IsLoggedIn(url: string){
    const isLogged = sessionStorage.getItem("SessionStarted");
    if(isLogged !== "1"){
      this.intentoDeAcceso = url;
      return false;
    }
    return true;
  }
}
