import { Component, Inject, PLATFORM_ID, OnInit} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngrx/store';
import * as fromApp from './ngrx/app.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ){}
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)) {
      // autologin
    }
  }
}
