import { environment } from '../environments/environment';

// Angular Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppRoutingModule } from './app-router.module';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { reducers } from './ngrx/app.reducers';
import { AuthEffects } from './auth/ngrx/auth.effects';


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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // app modules
    SharedModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
