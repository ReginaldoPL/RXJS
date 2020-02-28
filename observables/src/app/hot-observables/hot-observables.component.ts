import { Observable, Observer, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  n = 0;
  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';
  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i = 0;
        console.log('%c Observable Created', 'background: #cccccc; color: #ffffff');
        setInterval(() => {
          i++;
          console.log('%c i='+i, 'background: #cccccc; color: #0000ff');
          (i === 100) ? observer.complete() : observer.next(i);

        }, 1000);

      }
    );
    this.usingSubjects();
  }

  usingSubjects() {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);

    this.s1 = 'waiting for interval...';

    //Subscribe 1
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n1 = _n;
        this.s1 = 'ok';
      });
    }, 2000);


    this.s2 = 'waiting for interval...';
    // Subscribe 2
    setTimeout(() => {
      subject.subscribe((_n) => {
        this.n2 = _n;
        this.s2 = 'ok';
      });
    }, 4000);


  }

}
