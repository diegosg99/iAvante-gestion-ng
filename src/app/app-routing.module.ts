import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { UserComponent } from './views/user/user.component';
const routes:Routes=[
  {
    path:'',
    component: UserComponent
  },
  {
    path:'documentation',
    component: DocumentationComponent
  },
  {
    path:'tickets',
    component: TicketsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
