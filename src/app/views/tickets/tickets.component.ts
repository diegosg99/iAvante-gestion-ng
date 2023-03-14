import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {

  dni:string|null = "";
  course:string|null = "";
  courseUrl:string="";
  courseQR:any;

  constructor(private route: ActivatedRoute){
  }


  ngOnInit() {
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');
  }
}
