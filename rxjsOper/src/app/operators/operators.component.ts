import { Component, OnInit } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { map, delay } from 'rxjs/operators';

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
        map((e: MouseEvent) => { x: e.screenX, y: e.screenY })
      )
      .subscribe((pos) => console.log(pos));
  }

}
