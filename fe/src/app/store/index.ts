import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromToDo from './to-do/to-do.reducer';
import * as fromLoggedIn from './auth/login.reducer';
import { LoggedIn } from './auth';
import { ToDoItems } from './to-do';


export interface AppState {

  toDo: ToDoItems;
  loggedIn: LoggedIn;
}

export const reducers: ActionReducerMap<AppState> = {

  toDo: fromToDo.reducer,
  loggedIn: fromLoggedIn.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
