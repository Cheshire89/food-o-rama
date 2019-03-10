import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin-content',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninContent implements OnInit {
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
