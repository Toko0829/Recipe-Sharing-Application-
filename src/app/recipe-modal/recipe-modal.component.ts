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
  @Input() recipe!: Recipe; // Input property to receive recipe data from parent
  @Output() submit = new EventEmitter<Recipe>(); // Event emitted when form is submitted
  @Output() close = new EventEmitter<void>(); // Event emitted when modal is closed

  recipeForm!: FormGroup; // Reactive form for editing recipe

  constructor(private fb: FormBuilder) {} // FormBuilder to create reactive form

  // Lifecycle hook: initialize form with recipe values when component is created
  ngOnInit() {
    this.recipeForm = this.fb.group({
      title: [this.recipe.title, Validators.required], // Title field with validation
      description: [this.recipe.description, Validators.required], // Description field with validation
      thumbnail: [this.recipe.thumbnail, Validators.required], // Thumbnail field with validation
      ingredients: [this.recipe.ingredients, Validators.required], // Ingredients field with validation
      instructions: [this.recipe.instructions, Validators.required], // Instructions field with validation
    });
  }

  // Called when the user submits the form
  onSubmit() {
    if (this.recipeForm.valid) {
      this.submit.emit(this.recipeForm.value); // Emit updated recipe to parent
    }
  }

  // Called when the user closes the modal without submitting
  onClose() {
    this.close.emit(); // Notify parent to close the modal
  }
}
