import { ChangeDetectorRef, Component } from '@angular/core';
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
  filterFavorites: boolean = false;

  constructor(
    private masterService: MasterService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

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
    this.applyFilters();
  }

  saveFavorite(recipe: Recipe) {
    this.masterService.markAsFavorite(recipe.id).subscribe((response) => {
      console.log('Marked As Favorite', response);

      recipe.isFavorite = !recipe.isFavorite;

      this.applyFilters();
    });
  }

  toggleFavoriteFilter() {
    this.applyFilters();
  }

  applyFilters() {
    const search = this.searchInput?.toLowerCase() || '';

    this.recipes = this.filteredRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(search) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(search));

      const matchesFavorite = !this.filterFavorites || recipe.isFavorite;

      return matchesSearch && matchesFavorite;
    });
    this.cd.detectChanges();
  }
}
