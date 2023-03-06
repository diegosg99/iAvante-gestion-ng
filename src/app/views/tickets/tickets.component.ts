import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {

  dni:string|null;

  constructor(private route: ActivatedRoute){
    this.dni = "";
  }


  ngOnInit() {
    this.dni = this.route.snapshot.paramMap.get('dni');
  }
}
