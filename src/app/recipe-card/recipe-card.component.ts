import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.interface';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  // Input property to receive a Recipe object from a parent component
  @Input() recipe!: Recipe;

  // Output EventEmitter to notify parent component when user wants to view recipe details
  @Output() viewRecipe = new EventEmitter<Recipe>();

  // Output EventEmitter to notify parent component when user wants to toggle favorite status
  @Output() toggleFavorite = new EventEmitter<Recipe>();

  // Method triggered when the user wants to view recipe details
  details() {
    this.viewRecipe.emit(this.recipe); // Emits the current recipe to the parent
  }

  // Method triggered when the user wants to mark/unmark recipe as favorite
  saveToFavorites() {
    this.toggleFavorite.emit(this.recipe); // Emits the current recipe to the parent
  }
}
