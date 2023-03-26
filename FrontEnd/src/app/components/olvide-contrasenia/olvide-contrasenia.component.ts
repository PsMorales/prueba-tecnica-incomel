import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Recuperar } from 'app/models/modelos';
import { SesionService } from 'app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide-contrasenia',
  templateUrl: './olvide-contrasenia.component.html',
  styleUrls: ['./olvide-contrasenia.component.scss']
})
export class OlvideContraseniaComponent implements OnInit {

  form: FormGroup;
  hide = true;
  // afterLogin: AfterLogin;
  routerRedirect: string = "";
  recupera = new Recuperar();

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionService,
    private router: Router,
  ) {
    this.recupera = new Recuperar();
    const is_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    this.form = this.fb.group({
      nacimiento: [null, [Validators.required]],
      correo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  enviarEmail(){
    this.recupera = this.form.value as Recuperar;
    if(this.form.valid){
      this.sesionService.emailRecuperarContrasenia(this.recupera).subscribe(
        result => {
          if(result.length > 0 && result[0].Resultado === 1){
            this.sesionService.alert('success','Mensaje Enviado');
          }
          else{
            this.sesionService.alert('warning',"La fecha de nacimiento o coreo no son corectos");
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

  regrearInicio(){
    this.router.navigate(['/inicio']);
  }
}
