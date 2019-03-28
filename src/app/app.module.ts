import { environment } from '../environments/environment';

// Angular Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-router.module';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/ngrx/shopping-list.reducers';


firebase.initializeApp({
  apiKey: environment.auth_key,
  authDomain: environment.api_url
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // 3rd party modules
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    // app modules
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {

  }
 }
