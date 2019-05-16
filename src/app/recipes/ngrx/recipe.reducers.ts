import { Recipe } from "src/app/shared/recipe.model";

export interface State {
    recipes: Recipe[];
}

export interface FeatureState{
    recipes: State;
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action){
    return state;
}