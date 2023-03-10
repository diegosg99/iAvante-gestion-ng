import { Injectable } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { text } from "body-parser";

@Injectable({
  providedIn: 'root'
})
export class QRService {

    public imgDocumentation:string = "";
    
    private apiURL:string = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    constructor (private httpService:HttpClient) {
    }

    getQR(documentUrl:string): Observable < any > {
        return this.httpService.get < any > (this.apiURL + documentUrl,this.httpOptions);
    }
    uploadQR(dni:any): Observable < any > {
      return this.httpService.get < any > (this.apiURL + 'student/data/'+dni);
    }
} 