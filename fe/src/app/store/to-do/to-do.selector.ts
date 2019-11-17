import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ToDoItems } from '../to-do/to-do.model';

const visitCounter = createFeatureSelector<ToDoItems>('toDo');

export const items = createSelector(visitCounter, s => {
    console.log(s);
    if (s) return s.items;
    else return [];

});