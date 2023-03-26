import { SesionService } from 'app/services/sesion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cambio } from './../../models/modelos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.scss']
})
export class RecuperarContraseniaComponent implements OnInit {

  form: FormGroup;
  hide = true;
  // afterLogin: AfterLogin;
  routerRedirect: string = "";
  cambio = new Cambio();
  token = '';

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.cambio = new Cambio();
    const is_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    this.form = this.fb.group({
      contasenia: [null, [Validators.required]],
      contasenia2: [null, [Validators.required]],
      token_contrasenia: [null, []],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.form.get('token_contrasenia').setValue(this.token);
      } else {
        this.form.get('token_contrasenia').setValue('');
      }
    });
  }

  acualizar(){
    this.cambio = this.form.value as Cambio;
    if(this.form.valid && this.cambio.contasenia === this.cambio.contasenia2){
      this.sesionService.cambiarContrasenia(this.cambio).subscribe(
        result => {
          if(result.length > 0 && result[0].Resultado === 1){
            this.sesionService.alert('success','Contraseña Actualizada Exitosamente');
            this.router.navigate(['/inicio']);
          }
          else{
            this.sesionService.alert('warning','Este enlace ya no es valido');
            this.router.navigate(['/recuperar']);
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

  regresar(){
    this.router.navigate(['/inicio']);
  }
}
