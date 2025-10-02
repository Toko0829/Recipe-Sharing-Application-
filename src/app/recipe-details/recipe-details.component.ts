import { Component, EventEmitter, Output } from '@angular/core';
import { MasterService } from '../master.service';
import { Recipe } from '../recipes.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipes: Recipe | null = null;

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

  delete() {
    return this.masterService
      .deleteElement(this.recipes!.id)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
