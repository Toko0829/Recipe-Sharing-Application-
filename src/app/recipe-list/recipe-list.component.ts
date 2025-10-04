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
  recipes: Recipe[] = []; // Holds currently displayed recipes after filtering
  filteredRecipes: Recipe[] = []; // Holds the full original list from backend
  searchInput: string = ''; // Stores the search input from user
  filterFavorites: boolean = false; // Toggle to filter only favorite recipes

  constructor(
    private masterService: MasterService, // Service to fetch and update recipes
    private router: Router, // Router to navigate to recipe details
    private cd: ChangeDetectorRef // For manually triggering change detection
  ) {}

  // Lifecycle hook: fetch recipes on component init
  ngOnInit() {
    return this.masterService.getRecipes().subscribe((data) => {
      this.recipes = data; // Assign recipes to display
      this.filteredRecipes = data; // Keep a copy of full list for filtering
    });
  }

  // Navigate to recipe details page when a recipe is clicked
  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  // Called when user types in search input
  searchRecipe() {
    this.applyFilters(); // Apply search and favorite filters
  }

  // Toggle favorite status of a recipe
  saveFavorite(recipe: Recipe) {
    this.masterService.markAsFavorite(recipe.id).subscribe((response) => {
      console.log('Marked As Favorite', response);

      recipe.isFavorite = !recipe.isFavorite; // Update local status

      this.applyFilters(); // Reapply filters to reflect change
    });
  }

  // Toggle favorite filter on/off
  toggleFavoriteFilter() {
    this.applyFilters(); // Reapply filters based on new toggle state
  }

  // Apply search and favorite filters to recipe list
  applyFilters() {
    const search = this.searchInput?.toLowerCase() || '';

    this.recipes = this.filteredRecipes.filter((recipe) => {
      // Check if recipe matches search term in title or ingredients
      const matchesSearch =
        recipe.title.toLowerCase().includes(search) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(search));

      // Check if recipe matches favorite filter
      const matchesFavorite = !this.filterFavorites || recipe.isFavorite;

      // Include recipe only if it passes both filters
      return matchesSearch && matchesFavorite;
    });

    this.cd.detectChanges(); // Manually trigger change detection to update UI
  }
}
