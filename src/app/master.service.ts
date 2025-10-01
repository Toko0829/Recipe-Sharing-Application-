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
}
