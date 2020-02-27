import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements AfterViewInit {

  ///Uso de ViewChild precisa ser NGAfterViewInit agor...
  @ViewChild('myButton', { static: false }) buttao: ElementRef;
  n1 = 0;
  n2 = 0;
  s1 = ''
  s2 = '';

  constructor() { }

  ngAfterViewInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.buttao.nativeElement, 'click');
    myBtnClickObservable.subscribe((event) => console.log('buttao crlickes 1'));
    myBtnClickObservable.subscribe((event) => console.log('buttao crlickes 2'));



    class Producer {

      private myListeners = [];
      private n = 0;
      private id;

      addListner(l) {
        this.myListeners.push(l);
        console.log(this.myListeners.length);
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('From Producer: ' + this.n);
          for (let l of this.myListeners)
            l(this.n);
        }, 1000);
      }

      stop() {
        clearInterval(this.id);
      }

    }

    let producer: Producer = new Producer();
    producer.start();

    setTimeout(() => {
      producer.addListner((n) => console.log('from listener 1', n));
      producer.addListner((n) => console.log('from listener 2', n));

    }, 4000);

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListner((n) => observer.next(n))
      });
    myHotObservable.subscribe((n) => console.log('from subscriver 1', n));
    myHotObservable.subscribe((n) => console.log('from subscriver 2', n));

  }

}
