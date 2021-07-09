import { formatCurrency } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef : ElementRef;
  // @ViewChild('amountInput') amountInputRef : ElementRef;
  index: number;
  editMode = false;
  editedItem : Ingredient;
  name: string;
  amount: number;
  subscription: Subscription
  
  constructor(private shoppingServ: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingServ.editshopingListner.subscribe(
      (index: number) =>{
        this.index = index;
        this.editMode = true;
        this.editedItem = this.shoppingServ.getIngredeientBYIndex(this.index)
        this.name = this.editedItem.name;
        this.amount = this.editedItem.amount;
      }
    )
  }
  addItems(form : NgForm){
      const newIngredient = new Ingredient(form.value.name, form.value.amount)
     // this.shoppingServ.shoppingItem.emit(newIngredient);
     if(this.editMode){
      this.shoppingServ.editIngredeientItem(newIngredient, this.index)
     }else{
      this.shoppingServ.addIngredient(newIngredient)
     }
     form.reset()
     this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  clearForm(form: NgForm){
    form.reset();
    this.editMode = false;
  }
  deleteItem(form: NgForm){
    this.shoppingServ.deleteIngredent(this.index)
    this.clearForm(form);
  }

}
