import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../ngrx/auth.reducers';
import * as AuthActions from '../ngrx/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninContent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  @Input() name;

  constructor(
    private modal: NgbActiveModal,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
    .subscribe((authState: fromAuth.State) => {
      if(authState.authenticated) {
        this.router.navigate(['recipes']);
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

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TryLogin({ email: email, password: password }));
  }
}
