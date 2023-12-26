import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}

export interface LearningPackage {
  learningPackageId: number
  title: string
  description: string
}
export interface LearningFact{
  learningFactId: number
  title: string
  question: string
  answer: string
  nextStudyTime: Date
  lastDateReview: Date
  nbTimeReviewed: number
  learningPackageId: number
}
