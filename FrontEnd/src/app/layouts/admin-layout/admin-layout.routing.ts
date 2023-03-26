import { Routes } from '@angular/router';

// import { HomeComponent } from '../../home/home.component';
import { CrearEmpleadosComponent } from './../../components/empleados-manager/crear-empleados/crear-empleados.component';
import { ListarEmpleadosComponent } from './../../components/empleados-manager/listar-empleados/listar-empleados.component';
import { CrearUsuariosComponent } from './../../components/usuarios-manager/crear-usuarios/crear-usuarios.component';
import { ListarUsuariosComponent } from './../../components/usuarios-manager/listar-usuarios/listar-usuarios.component';
import { PalindromosComponent } from './../../components/palindromos/palindromos.component'

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard',      component: HomeComponent },
    { path: 'listar-usuarios',      component: ListarUsuariosComponent },
    { path: 'usuarios/:id',      component: CrearUsuariosComponent },
    { path: 'listar-empleados',      component: ListarEmpleadosComponent },
    { path: 'empleados/:id',      component: CrearEmpleadosComponent },
    { path: 'palindromos',      component: PalindromosComponent },
];
