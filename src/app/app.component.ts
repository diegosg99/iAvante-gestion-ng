import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iAvante-gestion-ng';
  isFormSent = false;

    onFormSent () {
       this.isFormSent = true;
    }
}
