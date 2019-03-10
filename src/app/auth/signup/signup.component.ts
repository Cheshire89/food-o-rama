import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-content',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupContent implements OnInit {
  @Input() name;
  constructor(public modal: NgbActiveModal) { }
  ngOnInit() {}

  close() {
    this.modal.close({ success: false })
  }

  save() {
    this.modal.close({ success: true});
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
      (response) => console.log('response', response)
    );
  }
}
