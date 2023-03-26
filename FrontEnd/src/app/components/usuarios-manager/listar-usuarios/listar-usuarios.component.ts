import { ConfigmacionAccionComponent } from './../../configmacion-accion/configmacion-accion.component';
import { Router } from '@angular/router';
import { SesionService } from './../../../services/sesion.service';
import { UsuariosService } from './../../../services/usuarios.service';
import { Usuario, RegistroInicio } from './../../../models/modelos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> | null;
  sesion_inicio: RegistroInicio;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'nombre', 'usuario', 'correo', 'nacimiento', 'agregado_el', 'acciones'
  ];

  constructor(
    private usuariosService: UsuariosService,
    private sesionService: SesionService,
    private router: Router,
    public dialogo: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
    this.sesion_inicio = this.sesionService.getToken();
  }

  ngOnInit(): void {
    this.cargarInformacion();
    // this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
  }

  cargarInformacion(){
    
    this.usuariosService.obtenerUsuarios({
      token: this.sesion_inicio.token
    }).subscribe(
      (resultado: any) => {
        if(resultado[0].EstadoToken !== '0'){
          this.dataSource.data = resultado as Usuario[];
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

  eliminarUsuario(usuario: Usuario){
    this.dialogo.open(ConfigmacionAccionComponent, {
        data: `Eliminar Usuario '${usuario.usuario}'`
      }).afterClosed().subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.usuariosService.eliminarUsuario({
            id: usuario.id,
            token: this.sesion_inicio.token 
          }).subscribe(
            (resultado: any) =>{
            if(resultado !== 0){
              if(resultado[0].EstadoToken !== '0'){
                // this.Mensaje(`Usuario '${servicio.TxtServicio}' eliminado`, 2, 1, 3);
                this.sesionService.alert('success', `Usuario '${usuario.usuario}' eliminado`);
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

  agregarUsuario(usuario?: Usuario){
    if(usuario){
      this.router.navigate([`/usuarios/${usuario.id}`]);
    }
    else{
      this.router.navigate(['/usuarios']);
    }
  }
}