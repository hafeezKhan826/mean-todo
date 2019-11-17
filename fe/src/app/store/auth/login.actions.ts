import { createAction, props } from '@ngrx/store';

export const loggedIn = createAction(
    '[User] Delete User',
    props<{ payload: { status: boolean } }>()
);


export const setUserDetails = createAction(
    '[User] Set User details',
    props<{
        isLoggedIn: boolean,
        token: string,
        email: string,
    }>()
);

