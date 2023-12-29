// learning-package.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LearningFact, LearningPackage} from "../app.component";

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
  createLearningPackage(learningPackage: LearningPackage): Observable<any> {
    return this.http.post(this.apiUrl, learningPackage);
  }

  updateLearningPackage(id: number, updatedPackage: LearningPackage): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedPackage);
  }


}
