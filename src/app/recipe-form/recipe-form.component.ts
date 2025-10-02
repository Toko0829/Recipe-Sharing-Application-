import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private masterService: MasterService) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  addRecipe() {
    const formValue = this.recipeForm.value;

    const ingredientsArray = formValue.ingredients
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    const recipeToSend = {
      ...formValue,
      ingredients: ingredientsArray,
    };

    return this.masterService.addRecipes(recipeToSend).subscribe((response) => {
      console.log(response);
    });
  }
}
