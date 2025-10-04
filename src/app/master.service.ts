import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipes.interface';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {} // Inject HttpClient to make HTTP requests

  // Fetch all recipes from backend
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<any[]>(`${this.baseUrl}recipes`);
  }

  // Add a new recipe to the backend
  addRecipes(recipes: Recipe): Observable<any> {
    return this.http.post<Recipe>(`${this.baseUrl}recipes`, recipes);
  }

  // Get a single recipe by its ID
  getRecipeById(id: any): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}recipes/${id}`);
  }

  // Delete a recipe by ID
  deleteRecipe(id: any): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.baseUrl}recipes/${id}`);
  }

  // Edit/update an existing recipe
  editRecipe(id: number, updateRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}recipes/${id}`, updateRecipe);
  }

  // Mark a recipe as favorite (patch request)
  markAsFavorite(id: number) {
    return this.http.patch<Recipe>(`${this.baseUrl}recipes/${id}`, {
      isFavorite: true, // Only update the isFavorite field
    });
  }
}
