import { environment } from '../environments/environment';

// Angular Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';

import { AppRoutingModule } from './app-router.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {
  RecipesComponent,
  RecipeListComponent,
  RecipeDetailComponent,
  RecipeItemComponent,
  RecipeStartComponent,
  RecipeEditComponent,
  RecipeService
} from './recipes';

import {
  ShoppingListComponent,
  ShoppingEditComponent,
  ShoppingListService
} from './shopping-list';

import {
  DropdownDirective,
  DataStorageService
} from './shared';

import {
  SignupComponent,
  SignupContent,
  SigninComponent,
  SigninContent
} from './auth';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    SignupComponent,
    SignupContent,
    SigninComponent,
    SigninContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService],
  entryComponents: [SignupContent, SigninContent],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.auth_key,
      authDomain: environment.api_url
    });
  }
 }
