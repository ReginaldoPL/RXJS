import { Person } from '../person'
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromPersonReducer from './person.reduce';

export interface AppState {
    people: fromPersonReducer.PeopleState;
}

export const appReducers: ActionReducerMap<AppState> = {
    people: fromPersonReducer.reducer
}


