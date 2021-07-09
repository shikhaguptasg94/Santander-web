import { EventEmitter } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
    //selectedRecipes = new EventEmitter<Recipe>();
    newRecipeEvent = new Subject<Recipe[]>();
    constructor(){}
    private recipes : Recipe[] = [];

      setRecipe(recipes: Recipe[]){
          this.recipes = recipes;
          this.newRecipeEvent.next(this.recipes.slice())
      }

      getRecipe(){
          return this.recipes.slice();
      }
      getRecipeById(id: number){
        return this.recipes.slice()[id];
      }
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.newRecipeEvent.next(this.recipes.slice())
      }
      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.newRecipeEvent.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.newRecipeEvent.next(this.recipes.slice())
      }
}