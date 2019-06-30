import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/ngrx/shopping-list.actions';
import * as fromRecipe from '../ngrx/recipe.reducers';
import * as RecipeActions from '../ngrx/recipe.actions';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dropdownConfig: NgbDropdownConfig,
    private store: Store<fromRecipe.FeatureState>
  ) {
    this.dropdownConfig.placement = 'top-right';
   }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  onAddToShoppingList() {
    this.store.select('recipes').pipe(
      take(1)
    ).subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
