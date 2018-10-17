import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'Burger', 
          'This is a test recipe', 
          'https://www.goodfood.com.au/content/dam/images/h/0/f/a/q/i/image.related.wideLandscape.940x529.h0fa4n.png/1515456591895.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Bread', 2),
            new Ingredient('Tomatoe', 1),
            new Ingredient('Letuce', 1),
          ]),
        new Recipe(
          'Sushi!', 
          'Om nom nom', 
          'https://staybarcelonaapartments.com/blog/wp-content/uploads/2016/12/6x4-rolls-monster-sushi-barcelona.jpg', [
            new Ingredient('Rice', 1),
            new Ingredient('Fish', 1),
            new Ingredient('Seaweed Wrap', 1)
          ]),
      ];
    
    getRecipes() {
        return this.recipes.slice();
    }
}