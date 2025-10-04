import { Component, EventEmitter, Output } from '@angular/core';
import { MasterService } from '../master.service';
import { Recipe } from '../recipes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';

@Component({
  selector: 'app-recipe-details',
  imports: [RecipeModalComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipes: Recipe | null = null; // Holds the recipe fetched by ID
  currentRecipe: any = null; // Holds a copy of the recipe for editing in the modal
  modal: boolean = false; // Controls modal visibility

  constructor(
    private masterService: MasterService, // Service to manage recipes (CRUD operations)
    private route: ActivatedRoute, // To read route parameters
    private router: Router // To navigate programmatically
  ) {}

  // Lifecycle hook runs after component initialization
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!; // Get recipe ID from route
    return this.masterService.getRecipeById(id).subscribe((data) => {
      this.recipes = data; // Fetch and assign the recipe
    });
  }

  // Deletes the current recipe
  deleteRecipe() {
    return this.masterService
      .deleteRecipe(this.recipes!.id) // Call service to delete by ID
      .subscribe((response) => {
        console.log(response); // Log response (optional)
        return this.router.navigate(['/']); // Navigate back to home after deletion
      });
  }

  // Opens the modal for editing
  openModal() {
    this.currentRecipe = { ...this.recipes }; // Make a copy of current recipe
    this.modal = true; // Show the modal
  }

  // Handles modal form submission
  onModalSubmit(updatedRecipe: Recipe) {
    this.recipes = { ...this.recipes, ...updatedRecipe }; // Merge updates

    return this.masterService
      .editRecipe(this.recipes.id, this.recipes) // Call service to save changes
      .subscribe((response) => {
        console.log(response); // Log response (optional)
        this.modal = false; // Close the modal after save
      });
  }

  // Closes the modal without saving changes
  onModalClose() {
    this.modal = false; // Hide modal
  }
}
