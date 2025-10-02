import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipes.interface';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<any[]>(`${this.baseUrl}recipes`);
  }

  addRecipes(recipes: Recipe): Observable<any> {
    return this.http.post<Recipe>(`${this.baseUrl}recipes`, recipes);
  }

  getRecipeById(id: any): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}recipes/${id}`);
  }

  deleteRecipe(id: any): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.baseUrl}recipes/${id}`);
  }

  editRecipe(id: number, updateRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}recipes/${id}`, updateRecipe);
  }
}
