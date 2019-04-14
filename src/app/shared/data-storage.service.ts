import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as fromAuth from '../auth/ngrx/auth.reducers';


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  authState: Observable<fromAuth.State>;
  api_url = environment.api_url;
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
    ) { }

  storeRecipes() {
    return this.http.put(this.api_url + 'recipes.json',this.recipeService.getRecipes());
    // const url = this.api_url + 'recipes.json';
    // const data = this.recipeService.getRecipes();
    // const req = new HttpRequest('PUT', url, data, {
    //   reportProgress: true,
    //   params: new HttpParams().set('auth', this.authService.token)
    // })

    // return this.http.request(req)
  }

  getRecipes() {
    return this.http.get<Recipe[]>(this.api_url + 'recipes.json')
      .pipe(
        map((recipes) => {
              for (let recipe of recipes) {
                if(!recipe['ingredients']) {
                  recipe.ingredients = [];
                }
              }
              return recipes;
          })
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
