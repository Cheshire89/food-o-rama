import { Component, OnInit, Input } from '@angular/core';
import { SigninContent, SignupContent } from '../';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-auth-modal',
  template: '<span (click)="open()"> {{ modalName | uppercase }} </span>',
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
          console.log('response', response);
        }
      }
    );
  }
}
