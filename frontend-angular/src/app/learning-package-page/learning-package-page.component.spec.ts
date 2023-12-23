import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPackagePageComponent } from './learning-package-page.component';

describe('LearningPackagePageComponent', () => {
  let component: LearningPackagePageComponent;
  let fixture: ComponentFixture<LearningPackagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningPackagePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningPackagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
