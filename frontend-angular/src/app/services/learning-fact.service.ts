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

  deleteLearningFact(learningFactId: number): Observable<any> {
    const url = `${this.apiUrl}/${learningFactId}`;
    return this.httpClient.delete(url);
  }


}
