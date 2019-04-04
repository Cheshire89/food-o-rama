import { Action } from '@ngrx/store';

export const ON_LOGIN = 'ON_LOGIN';
export const ON_LOGOUT = 'ON_LOGOUT';

export class Login implements Action {
    readonly  type = ON_LOGIN;
    constructor(public payload: {username: string, password: string}){}
}

export class Logout implements Action {
    readonly type = ON_LOGOUT;
}

export type AuthActions =
    Login |
    Logout ;