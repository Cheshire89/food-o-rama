import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes';
import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { AuthService } from '../auth';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  api_url = environment.api_url;
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
    ) { }

  storeRecipes() {
    if( this.authService.token) {
      return this.http.put(this.api_url + 'recipes.json?auth=' + this.authService.token, this.recipeService.getRecipes());
    } else {
      return Observable.throw({ details: 'no token was provided' });
    }
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
