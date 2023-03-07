import { Component, OnInit } from '@angular/core';
//import * as path from 'path';
//ng import * as Excel from 'exceljs';

declare var window:any;
//const filePath = path.resolve(__dirname, 'olympic-hockey-player.xlsx');

// type Team = 'M' | 'W';
// type Country = 'Canada' | 'USA';
// type Position = 'Goalie' | 'Defence' | 'Forward';

// type User = {
//   id: number;
//   team: Team;
//   country: Country;
//   firstName: string;
//   lastName: string;
//   weight: number;
//   height: number;
//   dateOfBirth: string; // (YYY-MM-DD)
//   hometown: string;
//   province: string;
//   position: Position;
//   age: number;
//   heightFt: number;
//   htln: number;
//   bmi: number;
  
// };

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})

export class ExcelComponent implements OnInit {

  formModal:any;
  file:any;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      this.file = document.getElementById("importExcel")
    )
  }
  openModal() {
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }
  importar = async () => {
    // const workbook = new Excel.Workbook();
    // const content = await workbook.xlsx.readFile(this.file);
  
    // const worksheet = content.worksheets[1];
    // const rowStartIndex = 4;
    // const numberOfRows = worksheet.rowCount - 3;
  
    // const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];
  
    // const players = rows.map((row): User => {
    //   return {
    //     // @ts-ignore
    //     id: this.getCellValue(row,1),
    //     // @ts-ignore
    //     team: this.getCellValue(row, 2),
    //     // @ts-ignore
    //     country: this.getCellValue(row, 3),
    //     firstName: this.getCellValue(row, 4),
    //     lastName: this.getCellValue(row, 5),
    //     // @ts-ignore
    //     weight: this.getCellValue(row, 6),
    //     height: +this.getCellValue(row, 7),
    //     dateOfBirth: this.getCellValue(row, 8), // (YYY-MM-DD)
    //     hometown: this.getCellValue(row, 9),
    //     province: this.getCellValue(row, 10),
    //     // @ts-ignore
    //     position: this.getCellValue(row, 11),
    //     age: +this.getCellValue(row, 12),
    //     heightFt: +this.getCellValue(row, 13),
    //     htln: +this.getCellValue(row, 14),
    //     bmi: +this.getCellValue(row, 15),
    //   }
    // });
  
    // console.log(players);
  };
  // getCellValue = (row:  Excel.Row, cellIndex: number) => {
  //   const cell = row.getCell(cellIndex);
    
  //   return cell.value ? cell.value.toString() : '';
  // };
}

//importar().then();
