import { Action, createReducer, on } from '@ngrx/store';
import { ToDoItems } from '.';
import { loadToDos, addToDo } from './to-do.actions';


export const toDoFeatureKey = 'toDo';


export const initialState: ToDoItems = {
  items: []
};

const toDoReducer = createReducer<any>(
  initialState,
  on(loadToDos, (state, payload) => {
    return ({
      ...state,
      items: payload.items
    });
  })
);

export function reducer(
  state: ToDoItems | undefined,
  action: Action) {
  return toDoReducer(state, action);
}
