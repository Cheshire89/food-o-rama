import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignActionComponent } from '../';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromApp from '../../ngrx/app.reducers';
import * as AuthActions from '../ngrx/auth.actions';


@Component({
  selector: 'app-auth-modal',
  template: '<div class="pad-tb-4" (click)="open()"> {{ modalName | titlecase }} </div>',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  @Input() modalName;
  content = SignActionComponent;
  constructor(
    private modalService: NgbModal,
    private store: Store<fromApp.AppState>,
  ) { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TryLogin({ email: email, password: password }));
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({ email: email, password: password }));
  }

  open() {
    const modalInstance = this.modalService.open(this.content, { centered: true, windowClass: 'modal-holder' });
    modalInstance.componentInstance.modalHeader = this.modalName;
    modalInstance.componentInstance.onSubmit = this.modalName === 'signin' ? this.onSignin : this.onSignup;
  }
}
