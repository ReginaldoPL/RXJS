import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription, Subject } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounceTime } from 'rxjs/operators';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  public searchInput: string='';

  @ViewChild(MatRipple) ripple: MatRipple;

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
  takeClick() { // take faz complete() depois de algumas x, no caso é 10
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100);
    });

    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        //take(10)
        //first()
        last()

      )
      .subscribe(
        v => console.log('Output: ', v),
        (error) => console.error(error),
        () => console.log("complete!")
      );
    const interv = setInterval(()=>{
      console.log('Checking...');
      if(s.closed) {
        console.warn('Subscription close');
        clearInterval(interv);
      }

    },200)
  }
  launchRipple(){
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true });
      rippleRef.fadeOut();
  }
  debounceTimeClick(){
    fromEvent(document, 'click')
    .pipe(
      tap((e) => console.log('click')),
      debounceTime(1000)
    )
    .subscribe(
      (e: MouseEvent) =>{
      console.log('click With debounceTime: '+e);
      this.launchRipple();
    })
  }
searchEntry$: Subject<string> = new  Subject<string>();

serachBy_UsingDebounceTime(event){
  this.searchEntry$.next(this.searchInput);
}
  debounceTimeSearchClick(){
    this.searchEntry$
    .pipe(
      debounceTime(500)
    )
    .subscribe((s)=> console.log(s));

  }


}
