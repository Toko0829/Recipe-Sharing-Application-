import { Component } from '@angular/core';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-recipe-list',
  imports: [],
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
