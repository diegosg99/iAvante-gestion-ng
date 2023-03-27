import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SuccessComponent } from './views/success/success.component';
import { SurveyComponent } from './views/survey/survey.component';
import { UserComponent } from './views/user/user.component';
const routes:Routes=[
  {
    path:'',
    component: UserComponent
  },
  {
    path:'prev-survey',
    component: UserComponent
  },
  {
    path:'documentation/:dni/:course',
    component: DocumentationComponent
  },
  {
    path:'survey/:dni/:course',
    component: SurveyComponent
  },
  {
    path:'success',
    component: SuccessComponent
  },
  { 
    path: '**',
    component: PageNotFoundComponent 
  }
  ,
  { 
    path: '**/**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
