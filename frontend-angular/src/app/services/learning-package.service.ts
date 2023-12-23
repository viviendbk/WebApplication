// learning-package.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearningPackageService {
  private apiUrl = '/api/learning-packages';

  constructor(private http: HttpClient) { }

  getLearningPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getLearningPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getLearningFactsByPackageId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/learning-facts`);
  }
}
