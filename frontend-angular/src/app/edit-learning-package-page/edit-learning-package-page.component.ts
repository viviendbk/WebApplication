import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LearningPackageService } from "../services/learning-package.service";
import { LearningFactService } from "../services/learning-fact.service";
import { LearningFact, LearningPackage } from "../app.component";
import { forkJoin } from "rxjs";

@Component({
    selector: 'app-edit-learning-package-page',
    templateUrl: './edit-learning-package-page.component.html',
    styleUrls: ['./edit-learning-package-page.component.css']
})
export class EditLearningPackagePageComponent implements OnInit {

    learningPackage: LearningPackage | undefined;
    learningPackageForm!: FormGroup;
    learningFactsFormArray: FormGroup[] = [];
    private learningFacts: LearningFact[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private learningPackageService: LearningPackageService,
        private learningFactService: LearningFactService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.fetchLearningPackage();
        this.fetchLearningFacts();
    }

    initForm(): void {
        this.learningPackageForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            // Add other form controls as needed
        });
    }

    fetchLearningPackage(): void {
        this.learningPackageService.getLearningPackageById(+this.route.snapshot.paramMap.get('id')!).subscribe(
            (data: LearningPackage) => {
                console.log('API Response:', data);
                this.learningPackage = data;
                this.learningPackageForm.patchValue({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    // Update other form controls as needed
                });
            },
            error => {
                console.error('Error fetching learning package:', error);
            }
        );
    }

    fetchLearningFacts(): void {
        const packageId = +this.route.snapshot.paramMap.get('id')!;
        this.learningPackageService.getLearningFactsByPackageId(packageId).subscribe(
            (response) => {
                console.log('Learning Facts:', response);
                this.learningFacts = response;
                this.learningFactsFormArray = response.map((learningFact: any) =>
                    this.formBuilder.group({
                        title: [learningFact.title, Validators.required],
                        question: [learningFact.question, Validators.required],
                        answer: [learningFact.answer, Validators.required],
                        // Add other form controls as needed based on your LearningFact model
                    })
                );
            },
            (error) => {
                console.error('Error fetching learning facts:', error);
            }
        );
    }

  updateLearningPackage(): void {
    if (this.learningPackageForm.valid) {
      const updatedPackage: LearningPackage = {
        ...this.learningPackage,
        ...this.learningPackageForm.value
      };

      // Identify learning facts to delete
      const factsToDelete: LearningFact[] = this.learningFacts
        .filter((fact, index) => !this.learningFactsFormArray[index])
        .map(fact => ({
          ...fact,
          markedForDeletion: true // You can add a flag or property to indicate deletion
        }));

      const updateLearningFactsObservables = this.learningFactsFormArray.map((formGroup, index) => {
        const learningFact: LearningFact = {
          ...this.learningFacts[index],
          ...formGroup.value
        };
        return this.learningFactService.updateLearningFact(learningFact);
      });

      const createLearningFactsObservables = this.learningFactsFormArray
        .filter((formGroup, index) => !this.learningFacts[index])
        .map(formGroup => {
          const learningFact: LearningFact = formGroup.value;
          learningFact.learningPackageId = updatedPackage.learningPackageId!;
          return this.learningFactService.createLearningFact(learningFact);
        });

      // Combine all observables using forkJoin
      forkJoin([...updateLearningFactsObservables, ...createLearningFactsObservables]).subscribe(
        (responses) => {
          console.log('Learning Facts updated/created:', responses);

          // After updating and creating, delete learning facts
          const deleteLearningFactsObservables = factsToDelete.map(learningFact => {
            return this.learningFactService.deleteLearningFactById(learningFact.learningFactId!);
          });
          console.log('test1')
          console.log('Number of delete observables:', deleteLearningFactsObservables.length);
          forkJoin(deleteLearningFactsObservables).subscribe(
            (deleteResponses) => {
              console.log('Learning Facts deleted:', deleteResponses);
              console.log("test2")
              // Continue with updating the learning package

            },
            (deleteError) => {
              console.error('Error deleting Learning Facts:', deleteError);
            }
          );
          this.learningPackageService.updateLearningPackage(updatedPackage.learningPackageId!, updatedPackage).subscribe(
            (response) => {
              console.log('Learning Package updated:', response);

            },
            (error) => {
              console.error('Error updating Learning Package:', error);
            });

        },

        (error) => {
          console.error('Error updating/creating Learning Facts:', error);
        });
    }
    this.router.navigate(['/edit']).then(() => {
      // Reload the page after navigation
      window.location.reload()
    });
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
