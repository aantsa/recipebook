import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipesService } from "./services/recipes.service";
import { ShoppingListService } from "./services/shopping-list.service";
import { DataStorageService } from "./shared/data-storage.service";

@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        DataStorageService,
        RecipesResolverService,
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        
    ]
})
export class CoreModule { }