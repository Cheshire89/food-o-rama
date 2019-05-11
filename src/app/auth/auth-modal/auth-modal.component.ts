import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninContent, SignupContent } from '../';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../ngrx/auth.reducers';
import * as AuthActions from '../ngrx/auth.actions';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-auth-modal',
  template: '<div class="pad-tb-4" (click)="open()"> {{ modalName | titlecase }} </div>',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Input() modalName;
  content: any;
  constructor(
    private modalService: NgbModal,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    switch(this.modalName) {
      case 'signin':
        this.content = SigninContent
        break;
      case 'signup':
        this.content = SignupContent
        break;
    }
  }

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
    modalInstance.componentInstance.onClose = this.modalName === 'signin' ? this.onSignin : this.onSignup;
  }
}
