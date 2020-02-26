import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1 = 0;
  n2 = 0;
  s1 = ''
  s2 = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initialising ...';
    this.s2 = 'Initialising ...';

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i: number = 0;
        let id = setInterval(() => {
          i++;
          console.log('from Observable: ', i);
          if (i == 10)
            observer.complete();
          else if (i % 2 == 0)
            observer.next(i);
        }, 100);
        return () => {
          clearInterval(id);
        }
      }
    );

    this.s1 = 'waiting for interval.. 1';
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => { this.n1 = _n },
      (error) => { this.s1 = 'Error: ' + error },
      () => { this.s1 = "completed" }
    );

    
    this.s2 = 'waiting for interval.. 2';
    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(
        (_n) => { this.n2 = _n },
        (error) => { this.s2 = 'Error: ' + error },
        () => { this.s2 = "completed" }
      );
    }, 300);

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000);
  }


}
