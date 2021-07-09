import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    shoppingItem = new Subject<Ingredient[]>();
    editshopingListner = new Subject<number>();
    private ingredient :Ingredient[] = [
        new Ingredient('Potato', 2),
        new Ingredient('Mango',3)
      ];
      getShpooingDetail(){
          return this.ingredient.slice();
      }
      addIngredient(ingredient: Ingredient){
          this.ingredient.push(ingredient);
          this.shoppingItem.next(this.ingredient.slice())
      }
      addIngredientList(ingredientList: Ingredient[]){
        //   for(let indgednt of ingredientList){
        //     this.ingredient.push(indgednt);
        //   }
        this.ingredient.push(...ingredientList);
        this.shoppingItem.next(this.ingredient.slice())
      }
      editIngredeientItem(ingredient: Ingredient, index:number){
        this.ingredient[index] = ingredient;
        this.shoppingItem.next(this.ingredient.slice())
      }
      getIngredeientBYIndex(index:number){
        return this.ingredient.slice()[index];
      }
      deleteIngredent(index:number){
        this.ingredient.splice(index,1);
        this.shoppingItem.next(this.ingredient.slice())
      }
}