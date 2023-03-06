import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  dni:string|null;
  
  constructor(
    private route: ActivatedRoute
    ) {
      this.dni = "";
  }
  ngOnInit() {
    this.dni = this.route.snapshot.paramMap.get('dni');
  }
}
