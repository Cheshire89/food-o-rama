import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {}

    @Effect()
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
            this.router.navigate(['recipes']);
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

    @Effect()
    authSignin = this.actions$.pipe(
        ofType(AuthActions.TRY_LOGIN),
        map((action: AuthActions.TryLogin) => {
            return action.payload
        }),
        switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password))
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['recipes']);
            return [
                {
                    type: AuthActions.LOGIN

                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                },
            ]
        })
    )

    /*
        \/  used if there is not event
            dispatched at the end of effect execution
        {dispatch: false}
    */

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    )
}