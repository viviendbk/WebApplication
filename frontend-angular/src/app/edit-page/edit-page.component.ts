import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LearningPackageService} from "../services/learning-package.service";
import {LearningFactService} from "../services/learning-fact.service";
import {LearningFact, LearningPackage} from "../app.component";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnInit{

  learningFacts: LearningFact[] = [];
  learningPackages: LearningPackage[] = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private learningPackageService: LearningPackageService,
    private learningFactService: LearningFactService
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

  navigateToLearningPackage(learningPackageId: any) {

  }
}
