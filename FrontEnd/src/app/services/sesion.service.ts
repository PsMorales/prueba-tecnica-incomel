import { RegistroInicio } from './../models/modelos';
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

  getToken(){
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
