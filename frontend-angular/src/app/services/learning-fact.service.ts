import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LearningFact} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class LearningFactService {
  private apiUrl = '/api/learning-facts';

  constructor(private httpClient: HttpClient) {

  }

  updateLearningFact(learningFact: LearningFact): Observable<any> {
    const url = `${this.apiUrl}/${learningFact.learningFactId}`;
    return this.httpClient.put(url, learningFact);
  }

  createLearningFact(learningFact: LearningFact): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.httpClient.post(url, learningFact);
  }

  deleteLearningFactById(learningFactId: number): Observable<any> {
    const url = `${this.apiUrl}/${learningFactId}`;
    return this.httpClient.delete(url);
  }

  getStudyTimeData(): Observable<any[]> {
    const url = `${this.apiUrl}/learning-facts/study-time-data`; // Adjust the endpoint
    return this.httpClient.get<any[]>(url);

  }
}
