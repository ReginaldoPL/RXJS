import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const myFirstObservable = new Observable(
      (obs: Observer<number>) => {
        obs.next(1);
        obs.next(2);
        obs.next(3);
        obs.next(4);
        obs.next(5);
        obs.complete();
      }
    );
    myFirstObservable.subscribe(
      (n: number) => {console.log(n); } ,
      (error) => console.log(error),
      () => console.log('completed.')

    );

  }

}
