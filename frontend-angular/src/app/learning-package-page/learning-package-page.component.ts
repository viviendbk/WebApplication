import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningPackageService } from '../services/learning-package.service';
import {LearningFactService} from "../services/learning-fact.service";

interface LearningPackage {
  learningPackageId: number
  title: string
  description: string
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
  showAnswerFlag: boolean = false;
  currentFactIndex: number = 0; // Track the index of the displayed learning fact

  constructor(
    private route: ActivatedRoute,
    private learningPackageService: LearningPackageService,
    private learningFactService: LearningFactService
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

  showAnswer(): void {
    // Implement the logic to show the answer here
    this.showAnswerFlag = true;
  }

  provideFeedback(feedback: string): void {
    // Handle the feedback (send to server, update data, etc.)
    console.log('Provided feedback:', feedback);

    // Reset flags
    this.showAnswerFlag = false;

    // Get the current learning fact
    const currentLearningFact = this.learningFacts[this.currentFactIndex];

    // Move to the next learning fact
    this.currentFactIndex++;

    // Check if there are more facts, if not, reset to the first fact
    if (this.currentFactIndex >= this.learningFacts.length) {
      this.currentFactIndex = 0;
    }

    // Update nextStudyTime based on feedback if the feedback is "easy"
    if (currentLearningFact) {
      const currentTimestamp = new Date();

      // Calculate the time difference in hours based on feedback
      let hoursToAdd = 0;
      if (feedback === 'easy') {
        hoursToAdd = 10;
      } else if (feedback === 'medium') {
        hoursToAdd = 5;
      } else if (feedback === 'difficult') {
        hoursToAdd = 1;
      }

      // Calculate the new nextStudyTime
      const newNextStudyTime = new Date(currentTimestamp.getTime() + hoursToAdd * 60 * 60 * 1000);

      console.log(currentLearningFact.nextStudyTime)

      currentLearningFact.nextStudyTime = newNextStudyTime.toISOString()
      console.log(newNextStudyTime.toISOString())
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
    }
  }

}
