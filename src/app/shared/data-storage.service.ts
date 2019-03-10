import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  api_url = environment.api_url;
  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.api_url + 'recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.api_url + 'recipes.json')
      .map((response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
              if(!recipe['ingredients']) {
                recipe.ingredients = [];
              }
            }
            return recipes;
      })
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
