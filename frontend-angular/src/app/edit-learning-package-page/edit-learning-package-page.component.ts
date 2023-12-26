import {Component, OnInit} from '@angular/core';
import {LearningFact, LearningPackage} from "../app.component";
import {ActivatedRoute, Router} from "@angular/router";
import {LearningPackageService} from "../services/learning-package.service";
import {LearningFactService} from "../services/learning-fact.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-learning-package-page',
  templateUrl: './edit-learning-package-page.component.html',
  styleUrl: './edit-learning-package-page.component.css'
})
export class EditLearningPackagePageComponent implements OnInit{
  learningFacts: LearningFact[] = [];
  learningPackage: LearningPackage | undefined;
  learningPackageForm: FormGroup;
  learningFactsFormArray: FormGroup[] = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private learningPackageService: LearningPackageService,
    private learningFactService: LearningFactService
  ) { }

  ngOnInit(): void {
    this.fetchLearningFacts();
    this.fetchLearningPackage();

    this.learningPackageForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  fetchLearningFacts(): void {
    if (this.id) {
      this.learningPackageService.getLearningFactsByPackageId(+this.id).subscribe(
        (response) => {
          console.log('Learning Facts:', response);
          this.learningFacts = response;
          // check if there is available learningFact
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
