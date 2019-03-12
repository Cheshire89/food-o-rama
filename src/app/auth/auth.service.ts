import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged = new Subject();
  token: string;
  currentUser: boolean = null;
  constructor() {
  }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      () => {
        this.getToken();
      }
    );
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          this.authChanged.next(!!this.token.length);
        }
      )
  }


}
