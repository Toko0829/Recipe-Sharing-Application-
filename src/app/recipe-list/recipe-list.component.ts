import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: any[] = [];

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    return this.masterService.getRecipes().subscribe((data) => {
      this.recipes = data;
    });
  }
}
