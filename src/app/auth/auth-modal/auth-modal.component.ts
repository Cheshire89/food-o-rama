import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SigninContent } from '../signin/signin.component';
import { SignupContent } from '../signup/signup.component';


@Component({
  selector: 'app-auth-modal',
  template: '<div class="pad-tb-4" (click)="open()"> {{ modalName | titlecase }} </div>',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Input() modalName;
  content: any;
  constructor(
    private modalService: NgbModal
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

  open() {
    this.modalService.open(this.content, { centered: true, windowClass: 'modal-holder' }).result
    .then(
      (response) => {
        if (response['success']) {
          // console.log('response', response);
        }
      }
    );
  }
}
