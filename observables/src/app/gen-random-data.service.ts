import { Injectable } from '@angular/core';
import { ConnectableObservable, Observer, Observable } from 'rxjs';
import { publish } from 'rxjs/operators';
import { DataModel } from './datamodel';



@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {
  public dataObservable: ConnectableObservable<DataModel>;

  constructor() {
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        let n = 0;
        console.log('Observable created');
        const f = () => {
          n++;
          console.log(n);
          if (n <= 10) {
            const t = Math.round(Math.random() * 2200 + 500);
            observer.next({ timestamp: t, data: n });
            setTimeout(f, t);
          } else {
            observer.complete();
          }
        };
        f();

      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;

  }
}
