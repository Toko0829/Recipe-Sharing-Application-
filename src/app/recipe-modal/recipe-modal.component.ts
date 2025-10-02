import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-recipe-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-modal.component.html',
  styleUrl: './recipe-modal.component.css',
})
export class RecipeModalComponent {
  @Input() recipe!: Recipe;
  @Output() submit = new EventEmitter<Recipe>();
  @Output() close = new EventEmitter<void>();

  recipeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      title: [this.recipe.title, Validators.required],
      description: [this.recipe.description, Validators.required],
      thumbnail: [this.recipe.thumbnail, Validators.required],
      ingredients: [this.recipe.ingredients, Validators.required],
      instructions: [this.recipe.instructions, Validators.required],
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.submit.emit(this.recipeForm.value);
    }
  }

  onClose() {
    this.close.emit();
  }
}
