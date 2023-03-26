import { ConfigmacionAccionComponent } from './../../components/configmacion-accion/configmacion-accion.component';
import { MaterialModule } from './../../shared/material/material/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

// COMPONENTES
// import { HomeComponent } from '../../home/home.component';
import { PalindromosComponent } from './../../components/palindromos/palindromos.component';
import { CrearEmpleadosComponent } from './../../components/empleados-manager/crear-empleados/crear-empleados.component';
import { ListarEmpleadosComponent } from './../../components/empleados-manager/listar-empleados/listar-empleados.component';
import { CrearUsuariosComponent } from './../../components/usuarios-manager/crear-usuarios/crear-usuarios.component';
import { ListarUsuariosComponent } from './../../components/usuarios-manager/listar-usuarios/listar-usuarios.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    MaterialModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    // HomeComponent,
    // UsuariosManagerComponent,
    ListarUsuariosComponent,
    CrearUsuariosComponent,
    ConfigmacionAccionComponent,
    // EmpleadosManagerComponent,
    ListarEmpleadosComponent,
    CrearEmpleadosComponent,
    PalindromosComponent,
  ],
  entryComponents: [
    ConfigmacionAccionComponent
  ]
})

export class AdminLayoutModule {}
