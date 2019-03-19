import { NgModule } from '@angular/core';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SigninContent } from './signin/signin.component';
import { SignupContent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AuthModalComponent,
    SigninContent,
    SignupContent,
  ],
  imports: [
    SharedModule,
    NgbModule
  ],
  entryComponents: [SigninContent, SignupContent],
  exports: [
    AuthModalComponent
  ]
})
export class AuthModule { }
