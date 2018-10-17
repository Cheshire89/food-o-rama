import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe', 
          'This is a test recipe', 
          'https://www.goodfood.com.au/content/dam/images/h/0/f/a/q/i/image.related.wideLandscape.940x529.h0fa4n.png/1515456591895.jpg'),
        new Recipe(
          'Sushi!', 
          'Om nom nom', 
          'https://staybarcelonaapartments.com/blog/wp-content/uploads/2016/12/6x4-rolls-monster-sushi-barcelona.jpg'),
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }
}