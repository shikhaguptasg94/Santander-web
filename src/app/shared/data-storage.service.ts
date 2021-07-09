import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators"
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
 
    constructor(private http: HttpClient, private recipeServ: RecipeService, private authServ: AuthService){}

    storeRecipe(){
        const recipes = this.recipeServ.getRecipe()
        return this.http.put('https://ng-recipe-book-1e0a7-default-rtdb.firebaseio.com/recipe.json',recipes)
    }

    fetchRecipe() {
        
            return this.http.get<Recipe[]>(
              'https://ng-recipe-book-1e0a7-default-rtdb.firebaseio.com/recipe.json'
            ).pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(recipes => {
            this.recipeServ.setRecipe(recipes);
          })
        );
      }
}