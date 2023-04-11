import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './views/user/user.component';
import { UserService } from './shared/services/user.service';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import * as bootstrap from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { CourseService } from './shared/services/course.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { SurveyComponent } from './views/survey/survey.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { QRService } from './shared/services/qr.service';
import { SuccessComponent } from './views/success/success.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    DocumentationComponent,
    SurveyComponent,
    PageNotFoundComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService,CourseService,QRService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
