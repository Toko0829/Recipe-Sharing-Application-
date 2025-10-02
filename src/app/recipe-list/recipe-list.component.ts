import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../recipes.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent, CommonModule, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchInput: string = '';

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit() {
    return this.masterService.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.filteredRecipes = data;
    });
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  searchRecipe() {
    const query = this.searchInput.toLowerCase();

    const filteredData = this.filteredRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.join(' ').toLowerCase().includes(query)
    );
    console.log(filteredData);
    this.recipes = filteredData;
  }
}
