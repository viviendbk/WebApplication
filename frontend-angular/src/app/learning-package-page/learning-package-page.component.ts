import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningPackageService } from '../services/learning-package.service';

interface LearningPackage {
  learningPackageId: number
  title: string
  description: string
  question: string
  answer: string
  nextStudyTime: string
}
interface LearningFact {
  learningFactId: number
  title: string
  question: string
  answer: string
  nextStudyTime: string
  learningPackageId: number
}

@Component({
  selector: 'app-learning-package-page',
  templateUrl: './learning-package-page.component.html',
  styleUrl: './learning-package-page.component.css'
})
export class LearningPackagePageComponent implements OnInit {
  learningFacts: LearningFact[] = [];
  learningPackage: LearningPackage | undefined;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private learningPackageService: LearningPackageService
  ) { }

  ngOnInit(): void {
    this.fetchLearningFacts();
    this.fetchLearningPackage();
  }

  fetchLearningFacts(): void {
    if (this.id) {
      this.learningPackageService.getLearningFactsByPackageId(+this.id).subscribe(
        (response) => {
          console.log('Learning Facts:', response);
          this.learningFacts = response;
        },
        (error) => {
          console.error('Error fetching learning facts:', error);
          // Handle the error
        }
      );
    }
  }

  fetchLearningPackage(): void {
    // @ts-ignore
    this.learningPackageService.getLearningPackageById(+this.id).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.learningPackage = data; // Assuming your API returns an array of learning packages
      },
      error => {
        console.error('Error fetching learning packages:', error);
      }
    );
  }
}
