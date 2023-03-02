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
import { CoursesComponent } from './views/courses/courses.component'
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { CourseService } from './shared/services/course.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[

  {
    path:'',
    pathMatch:'full',
    redirectTo:'app-root'
  },
  {
    path:'courses',
    redirectTo:'app-courses'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    ExcelComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        matcher: (url) => {
          if (url.length === 1 && url[0].path.match(/^[\w]+$/gm)) {
            return {
              consumed: url,
              posParams: {
                username: new UrlSegment(url[0].path.slice(1), {})
              }
            };
          }
      
          return null;
        },
        component: CoursesComponent
      }
    ])
  ],
  providers: [UserService,CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
