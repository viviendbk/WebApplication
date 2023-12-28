// edit-learning-package-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LearningPackageService } from "../services/learning-package.service";
import { LearningFactService } from "../services/learning-fact.service";
import { LearningPackage } from "../app.component";

@Component({
  selector: 'app-edit-learning-package-page',
  templateUrl: './edit-learning-package-page.component.html',
  styleUrls: ['./edit-learning-package-page.component.css']
})
export class EditLearningPackagePageComponent implements OnInit {

  learningPackage: LearningPackage | undefined;
  learningPackageForm!: FormGroup;
  id = this.route.snapshot.paramMap.get('id');

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
    this.learningPackageService.getLearningPackageById(+this.id!).subscribe(
      (data: LearningPackage) => {
        console.log('API Response:', data);
        this.learningPackage = data;
        // Update the form values based on the fetched learning package
        this.learningPackageForm.patchValue({
          title: data.title,
          description: data.description,
          //category: data.category,
          // Update other form controls as needed
        });
      },
      error => {
        console.error('Error fetching learning package:', error);
      }
    );
  }

  // Add a method to handle form submission (updating the learning package)
  updateLearningPackage(): void {
    if (this.learningPackageForm.valid) {
      const updatedPackage: LearningPackage = this.learningPackageForm.value;

      // Update the learning package
      this.learningPackageService.updateLearningPackage(+this.id!, updatedPackage).subscribe(
        (response) => {
          console.log('Learning Package updated:', response);
          // Optionally, you can navigate to another page after updating
          this.router.navigate(['/some-other-page']);
        },
        (error) => {
          console.error('Error updating Learning Package:', error);
        }
      );
    }
  }
}
