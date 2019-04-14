import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from  '../ngrx/app.reducers';
import * as AuthActions from './ngrx/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
    ) {
  }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.store.dispatch(new AuthActions.Signup());
      firebase.auth().currentUser.getIdToken()
        .then((token: string) => this.setToken(token));
    })
    .catch();
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        this.store.dispatch(new AuthActions.Login());
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => this.setToken(token));
      }
    );
  }

  setToken(token){
    this.router.navigate(['recipes']);
    this.store.dispatch(new AuthActions.SetToken(token));
  }

  logout(){
    firebase.auth().signOut;
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }

}
