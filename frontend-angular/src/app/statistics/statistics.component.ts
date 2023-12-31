// statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { LearningFactService } from '../services/learning-fact.service';
import { LearningPackageService } from '../services/learning-package.service';
import {LearningPackage} from "../app.component";

import { ChartType, ChartDataset } from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {
  public barChartOptions = { responsive: true };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [];

  constructor(private learningPackageService: LearningPackageService) {}

  ngOnInit(): void {
    this.fetchDataForGraphs();

    // Refait les parameteres parce que les fonctions pour fetch les données ne fonctionnent pas

    this.barChartOptions = {
        responsive: true,
      };
    this.barChartLabels = ['Category 1', 'Category 2', 'Category 3'];
    this.barChartLegend = true;
    this.barChartData = [
        { data: [65, 59, 80], label: 'Series A' },
        { data: [28, 48, 40], label: 'Series B' }
      ];
  }

  fetchDataForGraphs(): void {
    this.learningPackageService.getLearningPackagesWithFacts().subscribe(packages => {
      this.processDataForBarChart(packages);
    }, error => {
      console.error('Error fetching learning packages:', error);
    });
  }

  processDataForBarChart(packages: any[]): void {
    // Assuming each package has a 'category' and 'facts' array
    const categories = new Set(packages.map(pkg => pkg.category));
    this.barChartLabels = Array.from(categories);

    const data = Array.from(categories).map(category => {
      return packages
        .filter(pkg => pkg.category === category)
        .reduce((sum, current) => sum + current.facts.length, 0);
    });

    this.barChartData = [
      { data: data, label: 'Number of Learning Facts' }
    ];
  }
}
