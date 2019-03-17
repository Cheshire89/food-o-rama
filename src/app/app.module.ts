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
import { HeaderComponent } from './header/header.component';

import { RecipeService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DataStorageService } from './shared';

import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';
import {
  SignupContent,
  SigninContent,
  AuthService,
  AuthGuardService
} from './auth';

import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';


firebase.initializeApp({
  apiKey: environment.auth_key,
  authDomain: environment.api_url
});

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupContent,
    SigninContent,
    AuthModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule,
    ShoppingListModule,
    RecipesModule,
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuardService],
  entryComponents: [SignupContent, SigninContent],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {

  }
 }
