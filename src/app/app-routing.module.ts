import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { UserComponent } from './views/user/user.component';
const routes:Routes=[
  {
    path:'',
    component: UserComponent
  },
  {
    path:'documentation/:dni',
    component: DocumentationComponent
  },
  {
    path:'tickets/:dni',
    component: TicketsComponent
  }
  // { 
  //   path: '**',
  //   component: PageNotFoundComponent 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
