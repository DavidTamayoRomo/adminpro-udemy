import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(
    public  router: Router,
    public http: HttpClient
  ) {
    this.cargarStorege();
    console.log('Servicio de usuario listo');
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorege(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') ) ;
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
    .pipe( map( (resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario );
      return true;
    }));
  }

  login( usuario: Usuario, recordar: boolean = false ){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url , usuario)
    .pipe(map( (resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario );
      return true;
    } ));
  }

  crearUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
    .pipe(map((resp: any) => {
        swal('GUARDADO', 'Usuario guardado correctamente' + usuario.email, 'success');
        return resp.usuario;
    }));
  }


  
}
