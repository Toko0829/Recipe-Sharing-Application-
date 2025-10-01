import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.interface';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() viewRecipe = new EventEmitter<Recipe>();

  details() {
    this.viewRecipe.emit(this.recipe);
  }
}
