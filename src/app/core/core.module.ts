import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
// modules
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-router.module';
// services
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared';
import { AuthService, AuthGuardService } from '../auth';
import { AuthModule } from '../auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AuthModule,
        NgbModule
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService,
        AuthGuardService
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
    ],
})

export class CoreModule {}