import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataStorageService } from 'src/app/shared';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../../auth/ngrx/auth.reducers';
import * as AuthActions from '../../auth/ngrx/auth.actions';

import * as RecipeActions from '../../recipes/ngrx/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorage: DataStorageService,
    private dropdownConfig: NgbDropdownConfig,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.dropdownConfig.placement = 'bottom-right';
  }

  ngOnInit() {
    this.onGetRecipes();
    this.authState = this.store.select('auth');
  }

  onSaveRecipes(){
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onGetRecipes(){
    this.store.dispatch(new RecipeActions.GetRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }
}
