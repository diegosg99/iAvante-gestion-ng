import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  formModal:any;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("importExcel")
    )
  }
  openModal() {
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }
  importar() {

  }
}
