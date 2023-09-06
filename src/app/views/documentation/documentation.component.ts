import { Component, Input } from '@angular/core';
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
  room: number;
  imgDocumentation:string = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=";

  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) {
      this.dni = "";
      this.course = "";
      this.room = 0
  }
  ngOnInit() {
    this.getQR();
    this.getCourseRoom();
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
  getCourseRoom() {

    let courseCode = this.route.snapshot.params['course'];

    this.userService.getCourseRoom(courseCode).subscribe(item =>{
        this.room = item.rows[0].room}
        );
  }
}
