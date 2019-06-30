import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRecipe from '../ngrx/recipe.reducers';
import * as RecipeActions from '../ngrx/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
  recipeState: Observable<fromRecipe.State  >;
  subscription: Subscription;

  constructor(
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes')
    this.store.dispatch(new RecipeActions.GetRecipes());
  }
}
