import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  constructor(private route: ActivatedRoute,private router: Router, private recipeSer: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param : Params) => {
        this.id= +param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
    console.log(this.recipeForm)
    if(!this.editMode){
      this.recipeSer.addRecipe(this.recipeForm.value)
    }else{
      this.recipeSer.updateRecipe(this.id, this.recipeForm.value)
    }
    this.router.navigate(['../'],{relativeTo: this.route})
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  removeIngrnt(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let description ='';
    let ingredients = new FormArray([]);
    if(this.editMode){
      this.recipe = this.recipeSer.getRecipeById(this.id)
      recipeName = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      if(this.recipe.ingredients){
        for(let ingrdnt of this.recipe.ingredients){
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingrdnt.name, Validators.required),
              'amount': new FormControl(ingrdnt.amount,  [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
      this.recipeForm = new FormGroup({
        'name' : new FormControl(recipeName, Validators.required),
        'imagePath' : new FormControl(imagePath, Validators.required),
        'description' : new FormControl(description , Validators.required),
        'ingredients' : ingredients
      })
  }

}
