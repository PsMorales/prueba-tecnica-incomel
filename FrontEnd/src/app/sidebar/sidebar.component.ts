import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/listar-usuarios', title: 'Usuarios',  icon: 'pe-7s-user', class: '' },
    { path: '/listar-empleados', title: 'Empleados',  icon: 'pe-7s-note2', class: '' },
    { path: '/palindromos', title: 'Palindromos',  icon: 'pe-7s-news-paper', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/inicio']);
  }
}
