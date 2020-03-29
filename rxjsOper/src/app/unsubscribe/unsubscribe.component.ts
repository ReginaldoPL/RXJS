import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  subscriptionAreACtive = false;

  private subscriptions: Subscription[] = [];
  private unsbscribeAll$: Subject<any> = new Subject();

  private intervalSubscription : Subscription = null;




  constructor() { }

  ngOnInit(): void {
    this.checkSubscription();
  }

  subscribe() {
    const subscription = interval(100)
      .pipe(takeUntil(this.unsbscribeAll$))
      .subscribe((i) => { console.log(i); });

    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsbscribeAll$))
      .subscribe((e) => console.log(e));

    this.subscriptions.push(subscription);
    this.subscriptions.push(subscription2);
    this.subscriptionAreACtive = true;

  }

  checkSubscription() {
    this.intervalSubscription = interval((100)).subscribe(() => {
      let active = false;

      this.subscriptions.forEach((s) => {
        if (!s.closed)
          active = true;
      });
      this.subscriptionAreACtive = active;

    })
  }

  unsubscribe() {

    this.unsbscribeAll$.next();
  }
  onDestroy(){
    if ( this.intervalSubscription.closed!=null){
      this.intervalSubscription.unsubscribe();
    }
      this.unsubscribe();    
  }

}
