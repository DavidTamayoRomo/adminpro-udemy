import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
   // console.log('Guardar en el local storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes')) ;
      //console.log('Recuperar en el local storage');

      this.aplicarTema( this.ajustes.tema );
    } else {
      //console.log('Vaslores por defecto');
    }
  }
  aplicarTema(tema: string) {
    let urlTema = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', urlTema);

    this.ajustes.tema = tema;
    this.ajustes.temaURL = urlTema;
    this.guardarAjustes();
  }

}


interface Ajustes {
  temaURL: string;
  tema: string;
}
