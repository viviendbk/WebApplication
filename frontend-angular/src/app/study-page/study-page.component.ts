import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningPackageService } from '../services/learning-package.service';


interface LearningPackage {
  learningPackageId: number
  title: string
  description: string
  question: string
  answer: string
  nextStudyTime: string
}
@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.css'
})
export class StudyPageComponent implements OnInit {
  learningPackages: LearningPackage[] = [];

  constructor(
    private learningPackageService: LearningPackageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLearningPackages();
  }

  fetchLearningPackages(): void {
    this.learningPackageService.getLearningPackages().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.learningPackages = data; // Assuming your API returns an array of learning packages
      },
      error => {
        console.error('Error fetching learning packages:', error);
      }
    );
  }
  navigateToLearningPackage(id: number): void {
    this.router.navigate([`/learning-package/${id}`]);
  }
}
