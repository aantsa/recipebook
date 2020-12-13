import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../services/recipes.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-recipe-book-c6a27-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => {
            }, error => {
                alert('Error has occured');
            });
    }

    fetchRecipes() {
        
            return this.http.get<Recipe[]>(
                'https://ng-recipe-book-c6a27-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
            ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipesService.setRecipes(recipes);
            })
        );
    }
}