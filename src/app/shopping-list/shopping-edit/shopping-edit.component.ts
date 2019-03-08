import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createEmptyStateSnapshot } from '@angular/router/src/router_state';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  config = {
    editMode: false
  }
  editItemSubscription: Subscription;
  editedItemIndex: number;
  editedItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editItemSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.config.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          inName: this.editedItem.name,
          inAmount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.editItemSubscription.unsubscribe();
  }

  onSubmit() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.inName, value.inAmount);
    if (this.config.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.config.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear(){
    this.config.editMode = false;
    this.slForm.reset();
  }

  onDeleteItem() {
    if (this.config.editMode) {
       this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
    this.onClear();
  };


}
