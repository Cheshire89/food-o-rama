import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
// modules
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-router.module';
// services
import { RecipeService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared';
import { AuthService, AuthGuardService } from '../auth';
import { AuthModule } from '../auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AuthModule,
        NgbModule,
        ShoppingListModule
    ],
    providers: [
        RecipeService,
        DataStorageService,
        AuthService,
        AuthGuardService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
    ],
})

export class CoreModule {}