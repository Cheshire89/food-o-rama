import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../ngrx/shopping-list.actions';
import * as fromShoppingList from '../ngrx/shopping-list.reducers';

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
  editedItem : Ingredient;

  constructor(
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit() {
    this.editItemSubscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.config.editMode = true;
            this.slForm.setValue({
              inName: this.editedItem.name,
              inAmount: this.editedItem.amount
            });
          } else {
            this.config.editMode = false;
          }
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
      this.config.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear(){
    this.config.editMode = false;
    this.slForm.reset();
  }

  onDeleteItem() {
    if (this.config.editMode) {
       this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
    this.onClear();
  };


}
