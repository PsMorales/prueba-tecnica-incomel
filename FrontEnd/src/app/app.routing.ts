import { CanActivateGuard } from './guards/can-activate.guard';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  { path: '', redirectTo: 'listar-usuarios', pathMatch: 'full', }, 
  { path: '', component: AdminLayoutComponent, canActivate: [CanActivateGuard],
    children: 
    [
      { path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)}
    ]
  },
  { path: 'inicio', component: InicioSesionComponent},
  { path: '404', component: PaginaNoEncontradaComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
