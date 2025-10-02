import { Component, EventEmitter, Output } from '@angular/core';
import { MasterService } from '../master.service';
import { Recipe } from '../recipes.interface';
import { ActivatedRoute } from '@angular/router';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';

@Component({
  selector: 'app-recipe-details',
  imports: [RecipeModalComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipes: Recipe | null = null;
  currentRecipe: any = null;
  modal: boolean = false;

  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    return this.masterService.getRecipeById(id).subscribe((data) => {
      this.recipes = data;
    });
  }

  deleteRecipe() {
    return this.masterService
      .deleteRecipe(this.recipes!.id)
      .subscribe((response) => {
        console.log(response);
      });
  }

  openModal() {
    this.currentRecipe = { ...this.recipes };
    this.modal = true;
  }

  onModalSubmit(updatedRecipe: Recipe) {
    this.recipes = { ...this.recipes, ...updatedRecipe };

    return this.masterService
      .editRecipe(this.recipes.id, this.recipes)
      .subscribe((response) => {
        console.log(response);
        this.modal = false;
      });
  }

  onModalClose() {
    this.modal = false;
  }
}
