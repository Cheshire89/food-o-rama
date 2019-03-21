import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { AuthService } from '../auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  api_url = environment.api_url;
  constructor(
    private http: HttpClient,
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
    return this.http.get<Recipe[]>(this.api_url + 'recipes.json')
      .pipe(
        map(
          (recipes) => {
              for (let recipe of recipes) {
                if(!recipe['ingredients']) {
                  recipe.ingredients = [];
                }
              }
              return recipes;
          }
        )
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
