import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredient :Ingredient[] ;
  subscription : Subscription
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredient = this.shoppingService.getShpooingDetail();
    this.subscription = this.shoppingService.shoppingItem.subscribe(
      (ingredients : Ingredient[]) =>{
        this.ingredient = ingredients;
      }
    )
  }
  onitemSelect(index: number){
      this.shoppingService.editshopingListner.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
