// learning-package-create.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LearningFact, LearningPackage } from "../app.component";
import { LearningPackageService } from '../services/learning-package.service';
import { LearningFactService } from  '../services/learning-fact.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent {
  learningPackageForm: FormGroup;
  learningFactsFormArray: FormGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private learningPackageService: LearningPackageService,
    private learningFactsService: LearningFactService,
    private router: Router
  ) {
    this.learningPackageForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    // Initially, add one form for creating LearningFact
    this.addLearningFactForm();
  }

  createLearningPackage(): void {

    if (this.learningPackageForm.valid) {
      const learningPackage: LearningPackage = this.learningPackageForm.value;

      // Create Learning Package
      this.learningPackageService.createLearningPackage(learningPackage).subscribe(
        (response) => {
          console.log('Learning Package created:', response);

          // Create Learning Facts
          this.createLearningFacts(response.learningPackageId);
          this.router.navigate([`/study`]);

        },
        (error) => {
          console.error('Error creating Learning Package:', error);
        }
      );
    }
  }

  createLearningFacts(learningPackageId: number): void {
    for (let learningFactForm of this.learningFactsFormArray) {
      if (learningFactForm.valid) {
        let learningFact: LearningFact = learningFactForm.value;
        // Assign learningPackageId to the learningFact
        learningFact.learningPackageId = learningPackageId;

        // Create Learning Fact
        this.learningFactsService.createLearningFact(learningFact).subscribe(
          (response) => {
            console.log('Learning Fact created:', response);
            // Optionally, you can reset the form or update the UI
          },
          (error) => {
            console.error('Error creating Learning Fact:', error);
          }
        );
      }
    }
  }

  addLearningFactForm(): void {
    const learningFactForm = this.formBuilder.group({
      title: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      nextStudyTime: new Date(),
      lastDateReview: new Date(),
      nbTimeReviewed: 0,
      confidenceLevel: 0,
    });

    this.learningFactsFormArray.push(learningFactForm);
  }

  removeLearningFactForm(index: number): void {
    this.learningFactsFormArray.splice(index, 1);
  }
}
