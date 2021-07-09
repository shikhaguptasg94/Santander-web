import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private recipeServ: RecipeService, private shoppingServ : ShoppingListService, 
    private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) =>{
        this.id = +param['id'];
        this.recipe = this.recipeServ.getRecipeById(this.id);
      }
    )
  }
  addIngredientToShopping(){
    this.shoppingServ.addIngredientList(this.recipe.ingredients)
    this.router.navigate(['shopping-list'])
  }
  editRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  deleteRecipe(){
    this.recipeServ.deleteRecipe(this.id);
    this.router.navigate(['../'])
  }
}
