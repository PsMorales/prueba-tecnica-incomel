import { UsuariosService } from './../../../services/usuarios.service';
import { Usuario, RegistroInicio } from './../../../models/modelos';
import { SesionService } from './../../../services/sesion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.scss']
})
export class CrearUsuariosComponent implements OnInit {
  usuario_id: string = '';
  form: FormGroup;
  isLoading = false;
  usuario: Usuario;
  sesion_inicio: RegistroInicio;
  hide = true;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sesionService: SesionService,
    private usuariosService: UsuariosService
  ) {
    this.sesion_inicio = this.sesionService.getToken();
    const is_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    this.form = this.fb.group({
      id: [null, []],
      nombre: [null, []],
      usuario: [null, []],
      correo: [null, [Validators.pattern(is_email)]],
      contasenia: [null, []],
      nacimiento: [null, []],
      agregado_el: [null, []],
      modificado_el: [null, []],
      agregado_por: [null, []],
      modificado_por: [null, []],
      token_contrasenia: [null, []],
      agregado_token_contrasenia: [null, []],
      tiempo_token_contrasenia: [null, []],
      esado: [null, []],
      token: [null, []],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuario_id = params['id'];
      if (this.usuario_id) {
        this.loadUsuario(this.usuario_id);
      } else {
        this.newUsuario();
      }
    });
  }

  loadUsuario(usuario: string){
    this.usuariosService.obtenerDaosUsuario({
      id: usuario,
      token: this.sesion_inicio.token
    }).subscribe(
      resulado => {
        this.usuario = resulado[0] as Usuario;
        this.form.patchValue(this.usuario);
      },
      error => {
        this.router.navigate(['/listar-usuarios']);
      }
    );
  }

  newUsuario(){
    this.usuario = new Usuario(null);
    this.form.patchValue(this.usuario);
  }

  enviarFormulario(){
    if(this.form.valid){
      this.usuario = this.form.value as Usuario
      this.usuario.nacimiento = moment(this.usuario.nacimiento).format('YYYY-MM-DD');
      this.usuario.token = this.sesion_inicio.token;
      if(this.usuario && this.usuario.id){
        this.usuariosService.actualizarUsuario(this.usuario).subscribe(
          resultado =>{
            if(resultado[0].resulado !== 0){
              this.sesionService.alert('success',`Usuario ${this.usuario.usuario} actualizado exitosamente`);
              this.router.navigate(['/listar-usuarios']);
            }
            else{
              sessionStorage.clear();
              this.router.navigate(['/inicio']);
              this.sesionService.alert('info', "Token del usuario activo invalido");
            }
          },
          error =>{
            this.sesionService.alert('warning',"Ha ocurrido algun error inesperado");
          }
        );
      }
      else{
        this.usuariosService.agregarUsuario(this.usuario).subscribe(
          (resultado: any) =>{
            if(resultado[0].resulado !== 0){
              this.sesionService.alert('success',`Usuario ${this.usuario.usuario} creado exitosamente`);
              this.router.navigate(['/listar-usuarios']);
            }
            else{
              sessionStorage.clear();
              this.router.navigate(['/inicio']);
              this.sesionService.alert('info', "Token del usuario activo invalido");
            }
          },
          error =>{
            this.sesionService.alert('warning',"Ha ocurrido algun error inesperado");
          }
        );
      }
    }
    else{
      this.sesionService.alert('warning',"Por favor completar todos los campos");
    }
  }

}
