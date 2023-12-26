import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LearningPackageService } from '../services/learning-package.service';
import {LearningFactService} from "../services/learning-fact.service";
import {LearningFact, LearningPackage} from "../app.component";


@Component({
  selector: 'app-learning-package-page',
  templateUrl: './learning-package-page.component.html',
  styleUrl: './learning-package-page.component.css'
})
export class LearningPackagePageComponent implements OnInit, OnDestroy  {
  learningFacts: LearningFact[] = [];
  learningPackage: LearningPackage | undefined;
  id = this.route.snapshot.paramMap.get('id');
  showAnswerFlag: boolean = false;
  showEndMessage: boolean = false;
  currentFactIndex: number = 0; // Track the index of the displayed learning fact

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private learningPackageService: LearningPackageService,
    private learningFactService: LearningFactService
  ) { }

  ngOnInit(): void {
    this.fetchLearningFacts();
    this.fetchLearningPackage();
  }
  ngOnDestroy(): void {
    this.currentFactIndex = 0;
  }

  fetchLearningFacts(): void {
    if (this.id) {
      this.learningPackageService.getLearningFactsByPackageId(+this.id).subscribe(
        (response) => {
          console.log('Learning Facts:', response);
          this.learningFacts = response;
          // check if there is available learningFact
          this.showEndMessage = !this.isThereLearningFactsAvailable();
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

  canDisplayLearningFact(learningFact: LearningFact): boolean {
    let currentDate = new Date();
    let nextStudyTimeDate = new Date(learningFact.nextStudyTime);

    console.log("CURRENT DATE : " + currentDate)
    console.log("NEXT STUDY TIME : " + nextStudyTimeDate)
    console.log(nextStudyTimeDate <= currentDate)
    return nextStudyTimeDate <= currentDate;
  }

  isThereLearningFactsAvailable() : boolean {
    for (let i = 0; i < this.learningFacts.length; i++) {
      console.log("LEARNING FACT " + i)
      if (this.canDisplayLearningFact(this.learningFacts[i])) {
        return true
      }
    }
    return false
  }
  provideFeedback(feedback: string): void {

    // Reset booleans
    this.showAnswerFlag = false;
    this.showEndMessage = false

    let currentLearningFact = this.learningFacts[this.currentFactIndex];

    let newDate = new Date()
    if (currentLearningFact) {
      if (currentLearningFact.confidenceLevel < 2) {
        switch (feedback) {
          case 'Easy':
            newDate.setDate(newDate.getDate() + 1)
            currentLearningFact.confidenceLevel = 2
            break
          case 'Correct':
            currentLearningFact.confidenceLevel++
            if (currentLearningFact.confidenceLevel == 2) {
              newDate.setDate(newDate.getDate() + 1)
            }
            else {
              newDate.setMinutes(newDate.getMinutes() + 1)
            }
            break
          case 'To review':
            currentLearningFact.confidenceLevel = 0
            break
        }
      }
      else {
        switch (feedback) {
          case 'Easy':
            newDate.setDate(newDate.getDate() + 10);
            break
          case 'Correct':
            newDate.setDate(newDate.getDate() + 5);
            break
          case 'Difficult':
            newDate.setDate(newDate.getDate() + 2);
            break
          case 'To review':
            break
        }
      }

      currentLearningFact.nextStudyTime = newDate
      currentLearningFact.lastDateReview = new Date()
      currentLearningFact.nbTimeReviewed++;

      // Send a request to update the nextStudyTime in the database
      this.learningFactService
        .updateLearningFact(currentLearningFact)
        .subscribe(
          (response) => {
            console.log('NextStudyTime updated successfully:', response);
          },
          (error) => {
            console.error('Error updating NextStudyTime:', error);
            // Handle the error
          }
        );

      // looking for the next learningFact
      if (this.isThereLearningFactsAvailable()) {
        let newIndex = 0
        for (let i = 1; i < this.learningFacts.length; i++) {
          if (this.canDisplayLearningFact(this.learningFacts[(i + this.currentFactIndex) % this.learningFacts.length])) {
            newIndex = (i + this.currentFactIndex) % this.learningFacts.length;
            break
          }
        }
        this.currentFactIndex = newIndex
      }
      else
      {
        this.showEndMessage = true
      }
    }
  }

  goBackToStudyPage() {
    this.router.navigate([`/study`]);
  }
  showAnswer(): void {
    // Implement the logic to show the answer here
    this.showAnswerFlag = true;
  }
}
