import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipes.service';
import * as ShoppingListActions from '../../shopping-list/ngrx/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/ngrx/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownConfig: NgbDropdownConfig,
    private store: Store<fromShoppingList.AppState>
  ) {
    this.dropdownConfig.placement = 'top-right';
   }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
