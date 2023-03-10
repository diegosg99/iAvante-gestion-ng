import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/shared/models/user.model';
import { QRService } from 'src/app/shared/services/qr.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  dni:string|null;
  course:string|null;
  
  constructor(
    private route: ActivatedRoute,
    private QRservice: QRService,
    private userService: UserService
    ) {
      this.dni = "";
      this.course = "";
  }
  ngOnInit() {
    let documentUrl = "";
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');
    this.userService.getCourseDocumentation(this.course).subscribe(url=>{
      documentUrl = url;
    });
    this.QRservice.getQR(documentUrl).subscribe(console.log);

  }
}
