import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

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
    const myFirstObservable = new Observable(
      (obs: Observer<number>) => {
        obs.next(1);
        obs.next(2);
        obs.next(3);
        obs.next(4);
        obs.next(5);
        obs.error('ocorreu um error');
        obs.complete();
      }
    );
    myFirstObservable.subscribe(
      (n: number) => {console.log(n); } ,
      (error) => console.error(error),
      () => console.log('completed.')
    );
    /*
    const timerCount = interval(500);
    timerCount.subscribe(
      (n) => console.log(n)
    )
    console.log("after interval");
    */

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i:number = 0;
        let id = setInterval(() =>{
          i++;
          console.log('from Observable: ', i);
          if (i == 10)
            observer.complete();
          else if (i%2 == 0)
            observer.next(i);
        }, 1000);
        return () => {
          clearInterval(id);
        }
      }
    );
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => {this.n1 = _n},
      (error) => {this.s1 = 'Error: '+error},
      () => {this.s1 = "completed"}
    );

    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => {this.n2 = _n},
      (error) => {this.s2 = 'Error: '+error},
      () => {this.s1 = "completed"}
    );
    setTimeout(() =>{
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000);



  }

}
