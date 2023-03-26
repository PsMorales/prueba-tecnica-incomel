import { Router } from '@angular/router';
import { SesionService } from './../../services/sesion.service';
import { UsuariosService } from './../../services/usuarios.service';
import { Inicio, Usuario } from './../../models/modelos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  form: FormGroup;
  hide = true;
  // afterLogin: AfterLogin;
  routerRedirect: string = "";
  inicio= new Inicio();

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    private router: Router,
  ) {
    this.inicio = new Inicio();
    const is_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    this.form = this.fb.group({
      correo: [null, [Validators.pattern(is_email), Validators.required]],
      contasenia: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  inicioSesion(){
    this.inicio = this.form.value as Inicio;
    if(this.form.valid){
      this.sesionService.ServerInicioDeSesion(this.inicio).subscribe(
        result => {
          if(result.length > 0 && result[0].resultado === 1){
            this.sesionService.AlmacenarSessionStorage(result[0]);
            this.sesionService.alert('success','Bienvenido');
            this.routerRedirect = this.sesionService.intentoDeAcceso;
            this.sesionService.intentoDeAcceso = '';
            this.router.navigate([this.routerRedirect]);
          }
        },
        error =>{
          this.sesionService.alert('warning',"Ha ocurrido algun error inesperado");
        }
      );
    }
    else{
      this.sesionService.alert('warning',"Por favor completar todos los campos");
    }
  }
}
