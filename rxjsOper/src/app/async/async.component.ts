import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, toArray, delay } from 'rxjs/operators';


interface User {
  login: string;
  name: string;
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options$: Observable<string[]>;
  user$: Observable<User>;
  constructor() { }

  ngOnInit(): void {
    this.options$ = Observable.create(
      (observer) => {
        for (let i = 0; i < 10; i++) {
          observer.next(`This is my ${i}th option.`);
        }
        observer.complete();
      }
    )
      .pipe(
        map(s => s + '!'),
        toArray(),
        delay(2000)
      );
    //this.options$.subscribe(s => console.log(s));
    this.user$ = new Observable<User>((observer) => {
      let names = ["Mr. James", "Mr. Jonh", "Mr. Ray", "Ms. Angel"];
      let logins = ["james", "jonh", "ray", "angel"];
      let i = 0;
      console.log("Here in user$");
      setInterval(() => {
        if (i == 4)
          observer.complete();
        else {
          observer.next(
            { 
              name: names[i], 
              login: logins[i] 
            });
            i++;
        }
      }, 2000);      

    });
    this.user$.subscribe( s=> console.log(s));
  }

}
