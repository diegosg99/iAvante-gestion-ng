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
  imgDocumentation:string = "../../../assets/images/minimal-qr.svg";

  
  constructor(
    private route: ActivatedRoute,
    private QRservice: QRService,
    private userService: UserService
    ) {
      this.dni = "";
      this.course = "";
  }
  ngOnInit() {
    this.getQR();
  }
  getQR() {
    let documentUrl = "";
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');
    this.userService.getCourseDocumentation(this.course).subscribe(url=>{
      documentUrl = url.rows[0].documentationUrl;
      this.QRservice.getQR(documentUrl).subscribe(data => {
        console.log(data);
        this.imgDocumentation = data.url;
        console.log(this.imgDocumentation);

      });
    });
    
  }
}
