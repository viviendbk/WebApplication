import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLearningPackagePageComponent } from './edit-learning-package-page.component';

describe('EditLearningPackagePageComponent', () => {
  let component: EditLearningPackagePageComponent;
  let fixture: ComponentFixture<EditLearningPackagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLearningPackagePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLearningPackagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
