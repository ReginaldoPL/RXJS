import * as fromPersonActions from './person.actions'
import { state } from '@angular/animations'
import { Person } from '../person'

import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity'
import { selectIds } from './person.selector';

export interface PeopleState extends EntityState<Person>{}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>(
    {selectId: (p:Person) => p._id}
);

export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(state = initialState, action: fromPersonActions.PersonActions) {
    switch (action.type) {

        case fromPersonActions.PersonActionTypes.PERSON_NEW:           
            return peopleAdapter.addOne(action.payLoad.person, 
                state);

        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return peopleAdapter.removeOne(
                    action.payLoad.id, state
                    );
            ;        

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:            
            return peopleAdapter.updateOne(
                    {id : action.payLoad.id,
                         changes: action.payLoad.changes},
                         state);

        default:
            return state;

    }

}