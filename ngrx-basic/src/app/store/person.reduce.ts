import * as fromPersonActions from './person.actions'
import { state } from '@angular/animations'
import { Person } from '../person'

export const initialState: Person[] = []

export function reducer(state = initialState, action: fromPersonActions.PersonActions) {
    switch (action.type) {
        case fromPersonActions.PersonActionTypes.PERSON_ALL:
            return state;

        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return state.filter((p) => p._id != action.payLoad.id);

        case fromPersonActions.PersonActionTypes.PERSON_NEW:
            //não usar push pq estaria alterando o estado, por isso usar o concat
            return state.concat([action.payLoad.person]);

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
            let peoples = state.slice();
            let i = peoples.findIndex((p) => p._id == action.payLoad.person._id);
            if (i>=0)
                peoples[i] = action.payLoad.person;
            return peoples;

        default:
            return state;

    }

}