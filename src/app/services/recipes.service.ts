import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  /* DUMMY DATA */
  // private recipes: Recipe[] = [
  //   new Recipe('Pizza',
  //    'Extra cheesy pepperoni pizza',
  //     "https://cdn.pixabay.com/photo/2020/02/04/12/14/pepperoni-4818019_1280.jpg", 
  //     [
  //       new Ingredient('Pepperoni', 1),
  //       new Ingredient('Cheese', 5)
  //     ]),
  //   new Recipe('Hamburger',
  //    'Hamburger with a juicy steak',
  //     "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Steak', 1),
  //       new Ingredient('Tomato', 1),
  //       new Ingredient('Cheese', 1),
  //       new Ingredient('Pickle', 3),
  //       new Ingredient('Onion', 3)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  toShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
