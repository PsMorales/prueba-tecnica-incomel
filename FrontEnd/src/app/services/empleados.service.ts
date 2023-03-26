import { environment } from './../../environments/environment';
import { Empleado } from './../models/modelos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  obtenerEmpleados(data: any): Observable<Array<Empleado>>{
    const url = `${environment.AUTH_SERVER}obtener-Empleados`;
    return this.HttpClient.post<Array<Empleado>>(url, data); 
  }

  obtenerDaosEmpleado(data: any): Observable<Array<Empleado>>{
    const url = `${environment.AUTH_SERVER}obtener-datos-empleado`;
    return this.HttpClient.post<Array<Empleado>>(url, data); 
  }

  agregarEmpleado(data: Empleado): Observable<Array<Empleado>>{
    const url = `${environment.AUTH_SERVER}agregar-empleado`;
    return this.HttpClient.post<Array<Empleado>>(url, data); 
  }

  actualizarEmpleado(data: Empleado): Observable<Empleado>{
    const url = `${environment.AUTH_SERVER}actualizar-empleado`;
    return this.HttpClient.post<Empleado>(url, data); 
  }

  eliminarEmpleado(data: any): Observable<Empleado>{
    const url = `${environment.AUTH_SERVER}eliminar-empleado`;
    return this.HttpClient.post<Empleado>(url, data); 
  }
}
