import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './views/user/user.component';
import { UserService } from './shared/services/user.service';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { ExcelComponent } from './views/excel/excel.component';
import * as bootstrap from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { CourseService } from './shared/services/course.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { TicketsComponent } from './views/tickets/tickets.component';

// const routes:Routes=[

//   {
//     path:'',
//     pathMatch:'full',
//     redirectTo:'app-root'
//   },
//   {
//     path:'user',
//     redirectTo:'app-user'
//   },
//   {
//     path:'documentation',
//     redirectTo:'app-documentation'
//   },
//   {
//     path:'tickets',
//     redirectTo:'app-tickets'
//   },
// ];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    ExcelComponent,
    DocumentationComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService,CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
