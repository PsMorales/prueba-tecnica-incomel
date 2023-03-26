import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-configmacion-accion',
  templateUrl: './configmacion-accion.component.html',
  styleUrls: ['./configmacion-accion.component.scss']
})
export class ConfigmacionAccionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<ConfigmacionAccionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: any
  ) { }

  ngOnInit(): void {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

}
