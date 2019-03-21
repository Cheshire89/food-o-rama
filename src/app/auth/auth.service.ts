import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChanged = new Subject();
  token: string = null;
  currentUser: boolean = null;
  constructor(private router: Router) {
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

  logout(){
    if (this.isAuthenticated()) {
      firebase.auth().signOut;
      this.token = null;
      this.authChanged.next(this.token != null);
      this.router.navigate(['/']);
    }
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          if (this.token != null) {
            this.authChanged.next(!!this.token.length);
            this.router.navigate(['recipes']);
          }
        }
      )
  }

  isAuthenticated() {
    return this.token != null;
  }

}
