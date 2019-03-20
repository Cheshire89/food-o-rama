import { environment } from '../environments/environment';

// Angular Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-router.module';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { RecipeService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService, AuthGuardService } from './auth';
import { DataStorageService } from './shared';
import { CoreModule } from './core/core.module';


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
    HttpModule,
    NgbModule,
    // app modules
    AuthModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {

  }
 }
