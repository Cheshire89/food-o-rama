import { Recipe } from '../shared/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe(
          'Burger !',
          'A hamburger, beefburger or burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, or flame broiled.',
          'https://www.goodfood.com.au/content/dam/images/h/0/f/a/q/i/image.related.wideLandscape.940x529.h0fa4n.png/1515456591895.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Bread', 2),
            new Ingredient('Tomatoe', 1),
            new Ingredient('Letuce', 1),
          ]),
        new Recipe(
          'Sushi !',
          'Sushi is a Japanese dish of specially prepared vinegared rice, usually with some sugar and salt, combined with a variety of ingredients, such as seafood, vegetables, and occasionally tropical fruits',
          'https://staybarcelonaapartments.com/blog/wp-content/uploads/2016/12/6x4-rolls-monster-sushi-barcelona.jpg', [
            new Ingredient('Rice', 1),
            new Ingredient('Fish', 1),
            new Ingredient('Seaweed Wrap', 1)
          ]),
      ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
       return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}