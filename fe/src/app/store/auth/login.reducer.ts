import { Action, createReducer, on } from '@ngrx/store';
import { setUserDetails } from './login.actions';
import { LoggedIn } from '.';


export const loggedInFeatureKey = 'loggedIn';


export const initialState: LoggedIn = {
    isLoggedIn: false,
    token: '',
    email: '',
};

const loggedInReducer = createReducer<LoggedIn>(
    initialState,
    on(setUserDetails, (state, payload) => {
        return {
            ...state,
            isLoggedIn: payload.isLoggedIn,
            token: payload.token,
            email: payload.email,
        }
    })
);

export function reducer(
    state: LoggedIn | undefined,
    action: Action) {
    return loggedInReducer(state, action);
}