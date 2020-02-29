import { Component, OnInit, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/datamodel';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {
  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  public log: string[] = [];
  public connected = false;
  public subscription: Subscription;


  constructor() { }

  ngOnInit() {
  }

  logData(s: DataModel) {
    this.log.push('Timestamp:' + s.timestamp + ' Data: ' + s.data);

  }
  connect() {

    this.log.push('Connected');

    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DataModel) => { this.logData(data); },
      (error) => { this.connected = false; },
      () => { this.connected = false; this.log.push('Finished'); }
    );

  }
  disConnect() {

  }

}
