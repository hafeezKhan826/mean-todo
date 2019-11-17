import { createAction, props } from '@ngrx/store';
import { ToDoItems, ToDoItem } from './to-do.model';

export const loadToDos = createAction(
  '[ToDo] Load ToDos',
  props<{ items: ToDoItems[] }>()
);

export const addToDo = createAction(
  '[ToDo] Add ToDo',
  props<{
    items: any[]
  }>()

);

export const deleteToDo = createAction(
  '[ToDo] Delete ToDo'
);

