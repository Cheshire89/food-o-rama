import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../ngrx/auth.reducers';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-sign-action',
  templateUrl: './sign-action.component.html',
  styleUrls: ['./sign-action.component.scss']
})
export class SignActionComponent implements OnInit {
  modalHeader: string;
  prefix: string;
  authSubscription: Subscription;
  // bound to controller from auth-modal.component
  onSubmit;

  constructor(
    private modal: NgbActiveModal,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.prefix = this.modalHeader.split('sign')[1];
    this.authSubscription = this.store.select('auth')
    .subscribe((authState: fromAuth.State) => {
      if(authState.authenticated) {
        this.modal.close({ success: true });
      }
    });
  }

  close() {
    this.modal.close({ success: false })
  }


}
