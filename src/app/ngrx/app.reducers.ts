import * as fromShoppingList from '../shopping-list/ngrx/shopping-list.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State
}