import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'app/services/empleados.service';
import { SesionService } from 'app/services/sesion.service';
import { Empleado, RegistroInicio } from 'app/models/modelos';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.scss']
})
export class CrearEmpleadosComponent implements OnInit {
  empleado_id: string = '';
  form: FormGroup;
  isLoading = false;
  empleado: Empleado;
  sesion_inicio: RegistroInicio;
  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sesionService: SesionService,
    private empleadosService: EmpleadosService
  ) {
    this.sesion_inicio = this.sesionService.getToken();
    this.form = this.fb.group({
      id: [null, []],
      nombre_completo: [null, []],
      dpi: [null, [Validators.pattern('^[a-zA-Z0-9]*$')]],
      cantidad_hijos: [0, []],
      salario_base: [null, []],
      bono_decreto: [250.00, []],
      agregado_por: [null, []],
      modificado_por: [null, []],
      agregado_el: [null, []],
      modificado_el: [null, []],
      estado: [null, []],
      token: [null, []],
      igss: [0, []],
      irtra: [0, []],
      bono_paternidad: [0, []],
      salario_total: [0, []],
      salario_liquido: [0, []],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empleado_id = params['id'];
      if (this.empleado_id) {
        this.loadEmpleado(this.empleado_id);
      } else {
        this.newEmpleado();
      }
    });
  }

  loadEmpleado(empleado: string){
    this.empleadosService.obtenerDaosEmpleado({
      id: empleado,
      token: this.sesion_inicio.token
    }).subscribe(
      resulado => {
        this.empleado = resulado[0] as Empleado;
        this.form.patchValue(this.empleado);
        this.calcularTotales();
      },
      error => {
        this.router.navigate(['/listar-empleados']);
      }
    );
  }

  newEmpleado(){
    this.empleado = new Empleado(null);
    this.form.patchValue(this.empleado);
  }

  enviarFormulario(){
    if(this.form.valid){
      this.empleado = this.form.value as Empleado
      this.empleado.token = this.sesion_inicio.token;
      if(this.empleado && this.empleado.id){
        this.empleadosService.actualizarEmpleado(this.empleado).subscribe(
          resultado =>{
            if(resultado[0].resulado !== 0){
              this.sesionService.alert('success',`Empleado ${this.empleado.nombre_completo} actualizado exitosamente`);
              this.router.navigate(['/listar-empleados']);
            }
            else{
              sessionStorage.clear();
              this.router.navigate(['/inicio']);
              this.sesionService.alert('info', "Token del empleado activo invalido");
            }
          },
          error =>{
            this.sesionService.alert('warning',"Ha ocurrido algun error inesperado");
          }
        );
      }
      else{
        this.empleadosService.agregarEmpleado(this.empleado).subscribe(
          (resultado: any) =>{
            if(resultado[0].resulado !== 0){
              this.sesionService.alert('success',`Empleado ${this.empleado.nombre_completo} creado exitosamente`);
              this.router.navigate(['/listar-empleados']);
            }
            else{
              sessionStorage.clear();
              this.router.navigate(['/inicio']);
              this.sesionService.alert('info', "Token del empleado activo invalido");
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

  calcularTotales(){
    try {
      const salario_base = this.form.get('salario_base').value;
      const cantidad_hijos = this.form.get('cantidad_hijos').value;
      const bono_decreto = this.form.get('bono_decreto').value;
      const igss = this.calcularIgss(salario_base);
      const irtra = this.calculoIrtra(salario_base);
      const bono_paternidad = this.calculoBonoPaternidad(cantidad_hijos);
      const salario_total = this.calculoSalarioTotal(
        salario_base,
        bono_paternidad,
        bono_decreto
      );
      const salario_liquido = this.calculoSalarioLiquido(
        salario_total,
        igss,
        irtra
      );
      this.form.get('igss').setValue(igss.toFixed(2));
      this.form.get('irtra').setValue(irtra.toFixed(2));
      this.form.get('bono_paternidad').setValue(bono_paternidad.toFixed(2));
      this.form.get('salario_total').setValue(salario_total.toFixed(2));
      this.form.get('salario_liquido').setValue(salario_liquido.toFixed(2));
    } catch (err) {
      this.form.get('igss').setValue(0.00);
      this.form.get('irtra').setValue(0.00);
      this.form.get('bono_paternidad').setValue(0.00);
      this.form.get('salario_total').setValue(0.00);
      this.form.get('salario_liquido').setValue(0.00);
    }
  }

  calcularIgss(salario_base: number): number{
    return salario_base * 0.0483;
  }

  calculoIrtra(salario_base: number): number{
    return salario_base * 0.01;
  }

  calculoBonoPaternidad(cantidad_hijos: number): number{
    return 133 * cantidad_hijos;
  }

  calculoSalarioTotal(salario_base: number, bono_paternidad: number, bono_decreto: number): number{
    return (+salario_base) + (+bono_paternidad) + (+bono_decreto);
  }

  calculoSalarioLiquido(dalario_total: number, igss: number, irtra: number): number{
    return (+dalario_total) - (+igss) - (+irtra);
  }
}