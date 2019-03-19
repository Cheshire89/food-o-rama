import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth';

const appRoutes: Routes = [
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule', canActivate: [AuthGuardService] },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canActivate: [AuthGuardService] },
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}