import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipes: Recipe[] = [];
  saveBtn = false;
  subscription: Subscription;

  constructor(private recipeService: RecipesService,
    private router: Router, private route: ActivatedRoute, private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      })
    this.recipes = this.recipeService.getRecipes();

    if(this.recipes.length>0){
      this.saveBtn = true;
    }
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFetchRecipe() {
    this.dataService.fetchRecipes().subscribe();
    this.saveBtn = true;
  }
  onSaveRecipe() {
    this.dataService.storeRecipes();
  }


}
