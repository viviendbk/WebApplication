// statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { LearningFactService } from '../services/learning-fact.service';
import { LearningPackageService } from '../services/learning-package.service';
import {LearningPackage} from "../app.component";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  studyTimeData: any[] = [];

  constructor(private learningFactService: LearningFactService,
              private learningPackageService: LearningPackageService) {}

  ngOnInit(): void {

  }

}
