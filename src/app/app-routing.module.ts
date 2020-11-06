import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: 'recipe', component: RecipesComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'recipe-item', component: RecipeItemComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
