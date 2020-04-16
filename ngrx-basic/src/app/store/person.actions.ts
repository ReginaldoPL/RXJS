import { Action } from '@ngrx/store';
import { Person } from '../person';

//intenção de fazer ações
export enum PersonActionTypes {
    PERSON_ALL = '[PERSON_ALL] Get All Person',
    PERSON_NEW = '[PERSON_NEW] ADD a new Person',
    PERSON_UPDATE = '[PERSON_UPDATE] UPDATE a Person',
    PERSON_DELETE = '[PERSON_DELETE] DELETE a Person',
}

export class PersonAll implements Action {
    readonly type = PersonActionTypes.PERSON_ALL;
}

export class PersonNew implements Action {
    readonly type = PersonActionTypes.PERSON_NEW;
    //melhor colocar sempre  payLoad: { person: Person }
    constructor(public payLoad: { person: Person }) { }
}

export class PersonUpdate implements Action {
    readonly type = PersonActionTypes.PERSON_UPDATE;
    //melhor colocar sempre  payLoad: { person: Person }
    constructor(public payLoad: { id:string, changes: Partial<Person>}) { }
}

export class PersonDelete implements Action {
    readonly type = PersonActionTypes.PERSON_DELETE;
    //melhor colocar sempre  payLoad: { id: String }
    constructor(public payLoad: { id: string }) { }
}

//eportar tudo
export type PersonActions = PersonAll | PersonNew | PersonUpdate | PersonDelete;