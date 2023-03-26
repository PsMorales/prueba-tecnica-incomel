import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palindromos',
  templateUrl: './palindromos.component.html',
  styleUrls: ['./palindromos.component.scss']
})
export class PalindromosComponent implements OnInit {
  form: FormGroup;
  cantidad: number = 0;
  palabras: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      palaba: [null, []],
    });
  }

  calcularPalindromos(){
    this.cantidad = 0;
    this.palabras = [];
    var palabra = this.form.get('palaba').value;

    for(var i = 0; i <= palabra.length; i++){
      for(var j = palabra.length; j >= i; j--){
        this.agregarPalindromo(palabra.substr(i,j));
      }
    }

    this.repetidos();
  }


  agregarPalindromo(str) {
    var lowRegStr = str.toLowerCase();
    if((lowRegStr.substr(0,1) === lowRegStr.substr(lowRegStr.length-1,lowRegStr.length)) && lowRegStr.length > 2){
      this.palabras.splice(0, 0, str);
    }
  }

  repetidos(){
    let palabras = this.palabras;
    this.palabras = [];
    var palabras1 = [];
    var palabras2 = [];

    palabras.forEach(value => {
      palabras.filter(el => el === value).length > 1
      ? palabras1.push(value)
      : palabras2.push(value);
    });
    
    const uniqueRepeatedWords = [...new Set(palabras1)]
    this.palabras = uniqueRepeatedWords.concat(palabras2);

    this.cantidad = this.palabras.length;
  }
}