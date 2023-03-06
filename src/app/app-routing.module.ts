import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { UserComponent } from './views/user/user.component';
const routes:Routes=[
  {
    path:'',
    pathMatch:'full',
    redirectTo:'app-root'
  },
  {
    path:'user',
    redirectTo:'app-user'
  },
  {
    path:'documentation',
    redirectTo:'app-documentation'
  },
  {
    path:'tickets',
    redirectTo:'app-tickets'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
