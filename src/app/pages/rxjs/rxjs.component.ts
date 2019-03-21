import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .pipe()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observable termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log('loa pagina se va a cerrar');
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next( salida );
        /*if ( contador === 3) {
          clearInterval( intervalo );
          observer.complete();
        }*/
        /*if ( contador === 2 ) {
          //clearInterval( intervalo );
          observer.error('Auxilio');
        }*/
      }, 1000 );
    }).pipe(
        map( resp => resp.valor),
        filter( (valor, index) => {
          if ( (valor % 2 ) === 1 ) {
            //impar
            return true;
          } else {
            //par
            return false;
          }

        } )
     );
  }


}
