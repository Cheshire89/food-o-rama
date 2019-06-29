import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/recipe.model';

export const GET_RECIPES = 'GET_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class GetRecipes implements Action {
    readonly type = GET_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, updatedRecipe: Recipe}){}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){}
}

export type RecipeActions =
GetRecipes
| StoreRecipes
| SetRecipes
| AddRecipe
| UpdateRecipe
| DeleteRecipe;