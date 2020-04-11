import * as fromPersonActions from './person.actions'
import { state } from '@angular/animations';
import { Person } from '../person';

export const initialState: Person[] = [];

export function reducer(state = initialState, action: fromPersonActions.PersonActions) {
    switch (action.type) {
        case fromPersonActions.PersonActionTypes.PERSON_ALL:
            return state;
        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return state;
        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            return state;
        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            return state;
        default:
            return state;

    }

}