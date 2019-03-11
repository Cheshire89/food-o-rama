import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-content',
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
    .then( response => {
      this.modal.close({ success: true, data: response['user'] });
    })
    .catch( error => console.error('signupUser', error));
  }
}

@Component({
  selector: 'app-signup',
  template: '<span (click)="open()">Signup</span>',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit{
  constructor(private modalService: NgbModal) { }
  ngOnInit() {}
  open() {
    this.modalService.open(SignupContent, { centered: true, windowClass: 'modal-holder' }).result
    .then(
      (response) => {
        if (response['success']) {
          console.log('response', response);
        }
      }
    );
  }
}
