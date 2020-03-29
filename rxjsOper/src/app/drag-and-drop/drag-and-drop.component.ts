import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

   @ViewChild('myrect', { static: false }) myrect: ElementRef;
  top: number = 40;
  left: number = 40;
  constructor() { }

  ngOnInit(): void {
  
  }
  ngAfterViewInit(): void {
    let mouseDown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mouseUp = fromEvent(document, 'mouseup');
    let mouseMove = fromEvent(document, 'mousemove');

    mouseDown.subscribe((e: MouseEvent) => {
      console.log(e);
      let x = e.pageX;
      let y = e.pageY;

      mouseMove
      .pipe(
        takeUntil(mouseUp)
      )
      .subscribe((em: MouseEvent) => {
        console.log(em)
        let offsetx = x - em.pageX;
        let offsety = y - em.pageY;
        this.top -= offsety;
        this.left -= offsetx;
        x = em.pageX;
        y = em.pageY;
      });
    });

    

  }

}
