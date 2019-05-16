import { NgModule } from '@angular/core';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignActionComponent } from './sign-action/sign-action.component';

@NgModule({
  declarations: [
    AuthModalComponent,
    SignActionComponent,
  ],
  imports: [
    SharedModule,
    NgbModule
  ],
  entryComponents: [SignActionComponent],
  exports: [
    AuthModalComponent
  ]
})
export class AuthModule { }
