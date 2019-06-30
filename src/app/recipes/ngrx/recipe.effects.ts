import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, withLatestFrom } from "rxjs/operators";
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { environment } from "src/environments/environment";
import { Recipe } from "src/app/shared/recipe.model";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    api_url = environment.api_url;

    constructor(
        private actions$: Actions,
        private router: Router,
        private http: HttpClient,
        private store: Store<fromRecipe.FeatureState>
        ){}

    @Effect()
    recipeGet = this.actions$.pipe(
        ofType(RecipeActions.GET_RECIPES),
        switchMap((action: RecipeActions.GetRecipes) => {
            return this.http.get<Recipe[]>(this.api_url + 'recipes.json')

        }),
        map((recipes) => {
            for (let recipe of recipes) {
                if(!recipe['ingredients']) {
                recipe.ingredients = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        })
    );

    @Effect({dispatch: false})
    recipeStore = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            return this.http.put(this.api_url + 'recipes.json', state.recipes)
        })
    );
}