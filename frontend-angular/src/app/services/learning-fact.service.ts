import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface LearningFact {
  learningFactId: number
  title: string
  question: string
  answer: string
  nextStudyTime: string
  learningPackageId: number
}
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
}
