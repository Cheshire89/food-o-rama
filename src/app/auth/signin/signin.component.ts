import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin-content',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninContent implements OnInit {
  @Input() name;

  constructor(
    public modal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  close() {
    this.modal.close({ success: false })
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password)
    .then( response => {
      console.log('signIn', response)
      this.modal.close({ success: true, data: response['user'] });
    })
    .catch( error => console.error('signIn', error));
  }
}

@Component({
  selector: 'app-signin',
  template: '<span (click)="open()">Sigin</span>',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private modalService: NgbModal) { }
  ngOnInit() {}
  open() {
    this.modalService.open(SigninContent, { centered: true, windowClass: 'modal-holder' }).result
    .then(
      (response) => console.log('response', response)
    );
  }
}
