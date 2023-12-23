import { NgModule } from '@angular/core';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {StudyPageComponent} from "./study-page/study-page.component";
import {LearningPackagePageComponent} from "./learning-package-page/learning-package-page.component";
import {EditLearningPackagePageComponent} from "./edit-learning-package-page/edit-learning-package-page.component";

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'study', component:StudyPageComponent},
  {path: 'learning-package/:id', component: LearningPackagePageComponent },
  {path: 'edit-learning-package', component: EditLearningPackagePageComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgbModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
