import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoggedIn } from '../auth/login.model';

const visitCounter = createFeatureSelector<LoggedIn>('loggedIn');

// export const items = createSelector(visitCounter, s => s);
console.log(visitCounter);
export const isLoggedIn = createSelector(visitCounter, s => s.isLoggedIn);

export const loginDetails = createSelector(visitCounter, s => s);

