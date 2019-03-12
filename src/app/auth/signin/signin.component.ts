import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninContent implements OnInit, OnDestroy {
  authSubscription: Subscription
  @Input() name;

  constructor(
    public modal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChanged
      .subscribe(
        (userSignedIn: boolean) => {
          if (userSignedIn) {
            this.modal.close({ success: true});
          }
        }
      );
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
    this.authService.signinUser(email, password);
  }
}
