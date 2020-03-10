import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable } from 'rxjs';
import { map, delay, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  mapClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => (2 * i)),
        map(i => 10 * i),
        delay(1000)
      )
      .subscribe(i => console.log(i));
    fromEvent(document, 'click')
      .pipe(
        //map((e: MouseEvent) => e)
        map((e: MouseEvent) => ({ x: e.screenX, y: e.screenY }))
      )
      .subscribe((pos) => console.log(pos));
  }


  filterClick() {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter(i => i % 2 == 1)
      )
      .subscribe(i => console.log(i));

    interval(1000)
      .pipe(
        filter(i => i % 2 == 0),
        map(i => "Value: " + i),
        delay(1000)
      )
      .subscribe(i => console.log(i));
  }


  tapClick() {
    //tap, serve apenas para logar
    interval(1000)
      .pipe(
        tap(i => console.log('')),
        tap(i => console.warn('Before filter: ' + i)),
        filter(i => i % 2 == 0),
        tap(i => console.warn('After filter: ' + i)),
        map(i => "Value: " + i),
        tap(i => console.warn('After map: ' + i)),
        delay(1000)
      )
      .subscribe(i => console.log(i));

  }
  takeClick() {
    const observable = new Observable((observer) => {


    });
  }

}
