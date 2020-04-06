import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, switchAll, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {

  searchInput: string = '';
  private readonly url: string = 'http://localhost:9000'

  people$: Observable<Person[]>;
  @ViewChild('searchBy', { static: true }) el: ElementRef;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    // calback hell this.firstOption();
   // this.secondOption();
   this.thirdOption();
  }
  filterPeople(searchInput: string): Observable<Person[]> {
    if (searchInput.length === 0)
      return of([]);
    return this.http.get<Person[]>(`${this.url}/${searchInput}`)
  }

  thirdOption(){
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    
    /*this.people$ = keyup$
    .pipe(map((e) => this.filterPeople(this.searchInput)))//pega o que digitou
    .pipe(switchAll());//troca todos pelas novas, valerá somente a última
    */

    //substituindo tudo por
    this.people$ = keyup$
    .pipe(
      debounceTime(700),
      switchMap(() => this.filterPeople(this.searchInput)));  
  }
  secondOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup');
    this.people$ = keyup$.pipe(
      mergeMap((e) => this.filterPeople(this.searchInput))
    );  

   /* let fetch$ = keyup$.pipe(
      map((e) => this.filterPeople(this.searchInput))
    );

    this.people$ = fetch$
      .pipe(mergeAll());*/

    this.people$ = keyup$.pipe(
      mergeMap((e) => this.filterPeople(this.searchInput))
    );     
  }

  //calback hell, encadeamento de subscribe
  firstOption() {
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe(e => {
        this.filterPeople(this.searchInput)
          .subscribe((s) => {
            console.log(JSON.stringify(s));
          })


      });

  }

}
