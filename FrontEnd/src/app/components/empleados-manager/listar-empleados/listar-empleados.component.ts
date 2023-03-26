import { ConfigmacionAccionComponent } from './../../configmacion-accion/configmacion-accion.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SesionService } from './../../../services/sesion.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado, RegistroInicio } from './../../../models/modelos';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.scss']
})
export class ListarEmpleadosComponent implements OnInit {
  dataSource: MatTableDataSource<Empleado> | null;
  sesion_inicio: RegistroInicio;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'nombre', 'usuario', 'correo', 'nacimiento', 'agregado_el', 'acciones'
  ];

  constructor(
    private empleadosService: EmpleadosService,
    private sesionService: SesionService,
    private router: Router,
    public dialogo: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarInformacion();
  }

  cargarInformacion(){
    this.empleadosService.obtenerEmpleados({
      token: this.sesion_inicio.token
    }).subscribe(
      (resultado: any) => {
        if(resultado[0].EstadoToken !== '0'){
          this.dataSource.data = resultado as Empleado[];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else{
          sessionStorage.clear();
          this.router.navigate(['/inicio']);
          this.sesionService.alert('info', "El token del usuario activo es invalido");
        }
      },
      error => {
        this.sesionService.alert('warning',"Ha ocurrido algun error inesperado");
      }
    );
  }

  eliminarEmpleado(empleado: Empleado){
    this.dialogo.open(ConfigmacionAccionComponent, {
        data: `Eliminar Empleado '${empleado.nombre_completo}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.empleadosService.eliminarEmpleado({
            id: empleado.id,
            token: this.sesion_inicio.token 
          }).subscribe(
            (resultado: any) =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                this.sesionService.alert('success', `Empleado '${empleado.nombre_completo}' eliminado`);
                this.cargarInformacion();
              }
              else{
                sessionStorage.setItem("DatosUsuario", "");
                sessionStorage.setItem("SessionStarted", "0");
                this.router.navigate(['/login']);
                this.sesionService.alert('info', "Token del usuario activo invalido");
              }
            }
            else{
              this.sesionService.alert('error', "Error del servidor");
            }
          },
          error =>{
            this.sesionService.alert('error',error.statusText);
          })
        } else {
          this.sesionService.alert('info', "No se ha realizado ninguna accion");
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarEmpleado(empleado?: Empleado){
    if(empleado){
      this.router.navigate([`/empleados/${empleado.id}`]);
    }
    else{
      this.router.navigate(['/empleados']);
    }
  }

}
