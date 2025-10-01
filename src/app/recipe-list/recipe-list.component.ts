import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../recipes.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent, CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit() {
    return this.masterService.getRecipes().subscribe((data) => {
      this.recipes = data;
    });
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }
}
