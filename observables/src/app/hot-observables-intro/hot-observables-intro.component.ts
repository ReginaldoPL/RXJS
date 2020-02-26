import { Component, OnInit, AfterViewInit ,ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements AfterViewInit  {

  ///Uso de ViewChild precisa ser NGAfterViewInit agor...
  @ViewChild('myButton', {static : false}) buttao: ElementRef;
  n1 = 0;
  n2 = 0;
  s1 = ''
  s2 = '';

  constructor() { }

  ngAfterViewInit() {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.buttao.nativeElement,'click');

      myBtnClickObservable.subscribe((event) => console.log('buttao crlickes 1'));
      myBtnClickObservable.subscribe((event) => console.log('buttao crlickes 2'));

  }

}
