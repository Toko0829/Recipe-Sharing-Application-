import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent {
  recipeForm: FormGroup; // Reactive form group to hold recipe input fields

  constructor(
    private fb: FormBuilder, // FormBuilder service to create reactive forms
    private masterService: MasterService, // Service to perform CRUD operations
    private router: Router // Router to navigate programmatically
  ) {
    // Initialize the form with fields and validators
    this.recipeForm = this.fb.group({
      title: ['', Validators.required], // Title is required
      description: ['', Validators.required], // Description is required
      thumbnail: ['', Validators.required], // Thumbnail URL is required
      ingredients: ['', Validators.required], // Ingredients input is required
      instructions: ['', Validators.required], // Instructions are required
    });
  }

  // Method to handle form submission
  addRecipe() {
    const formValue = this.recipeForm.value; // Get current form values

    // Convert comma-separated ingredients string into an array
    const ingredientsArray = formValue.ingredients
      .split(',') // Split string by commas
      .map((item: string) => item.trim()) // Remove extra whitespace
      .filter((item: string) => item.length > 0); // Remove empty items

    // Create final recipe object to send to backend
    const recipeToSend = {
      ...formValue,
      ingredients: ingredientsArray, // Replace string with array
    };

    // Call service to add the recipe
    return this.masterService.addRecipes(recipeToSend).subscribe((response) => {
      console.log(response); // Log the server response
      return this.router.navigate(['/']); // Navigate back to home page
    });
  }
}
