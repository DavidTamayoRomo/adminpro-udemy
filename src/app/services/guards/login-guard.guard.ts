import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate  {
// tslint:disable-next-line: variable-name
  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService ) {

  }

  canActivate() {
    if (this._usuarioService.estaLogueado() ) {
      console.log('paso por el login Guard');
      return true;
    } else {
      console.log('Bloqueado poer el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
