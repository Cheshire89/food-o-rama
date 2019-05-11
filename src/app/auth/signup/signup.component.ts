import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../ngrx/auth.reducers';
import * as AuthActions from '../ngrx/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupContent implements OnInit, OnDestroy{
  authSubscription: Subscription;
  @Input() name;

  constructor(
    private modal: NgbActiveModal,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
    .subscribe((authState: fromAuth.State) => {
      if(authState.authenticated) {
        this.modal.close({ success: true });
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  close() {
    this.modal.close({ success: false })
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({ email: email, password: password }));
  }
}
