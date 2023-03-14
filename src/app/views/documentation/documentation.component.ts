import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  dni:string|null;
  course:string|null;
  imgDocumentation:string = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=";

  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) {
      this.dni = "";
      this.course = "";
  }
  ngOnInit() {
    this.getQR();//TODO: Si quieres que se genera al pulsar un boton quita esto e inserta el boton comentado en el html
  }
  getQR() {
    let documentUrl = "";
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');
    this.userService.getCourseDocumentation(this.course).subscribe(url=>{
      documentUrl = url.rows[0].documentationUrl;
      this.imgDocumentation += documentUrl;
    });
    
  }
}
