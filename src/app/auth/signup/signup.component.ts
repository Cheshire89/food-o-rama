import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupContent implements OnInit {
  @Input() name;

  constructor(
    public modal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  close() {
    this.modal.close({ success: false })
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
    .then(response => {
      this.modal.close({ success: true, data: response });
    })
    .catch( error => console.error('signupUser', error));
  }
}
