import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect(
        /*
            \/  used if there is not event
                dispatched at the end of effect execution
            {dispatch: false}
        */
    )
    authSignup = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup) => {
            return action.payload
        }),
        switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password))
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [
                {
                    type: AuthActions.SIGNUP

                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                },
            ]
        })
    );

    constructor(
        private actions$: Actions
    ) {

    }
}