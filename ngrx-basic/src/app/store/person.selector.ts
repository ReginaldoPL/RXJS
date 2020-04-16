import * as fromPersonReducer from './person.reduce'
import { createFeatureSelector } from '@ngrx/store'

export const peopleState = createFeatureSelector<fromPersonReducer.PeopleState>('people');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal

} = fromPersonReducer.peopleAdapter.getSelectors(peopleState);