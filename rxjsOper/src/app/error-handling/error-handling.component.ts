import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { map, tap, catchError, retry, retryWhen, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startTeste() {
    let obj: Observable<any> = new Observable((observer) => {
      for (let i = 0; i < 10; i++) {
        if (i == 7)
          observer.error(`An Error ocurred when i =${i}`);
        else
          observer.next(i);
      }
    });
    obj
      .pipe(
        map(i => i * 10),
        tap(i => console.log('Before Error handling ' + i)),
        catchError(error => { 
          console.error('inside catchError ',error);
          //return of(0);//retorna 0 pra eu conseguir fazer algo
          return throwError(`throwError: ${error}`);        
        }),
        //retry(2), //tenta mais 2 vezes
        retryWhen( i => timer(5000))
      )
      .subscribe(
        (i) => console.log('Normal output: ' + i),
        err => console.log(err),
        () => console.log('Complete')

      );
      let obj2: Observable<any> = new Observable((observer) =>{
        timer(2000).subscribe((n) => observer.next(1000));
        timer(2500).subscribe((n) => observer.complete());
      });
      obj2
        .pipe(
          timeout(1000)
        )
        .subscribe(
          (i) => console.log('Normal output 2: ' + i),
          err => console.log(err),
          () => console.log('Complete 2')
  
        );


  }

}
