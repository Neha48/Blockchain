import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlockServiceService {
  // url:string="http://localhost:8088/api/";
  constructor(private http: HttpClient) { }
  getBlocks(){
    return this.http.get("/api/blocks");
  }
  send(formdata){
    // console.log(formdata.get("amt"));
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded','Accept':'*/*'
      }),
      // params: new HttpParams().set("amt",formdata.get("amt"))
    }
    return this.http.post("/api/send",formdata,httpOptions);
  }
  create(formdata){
    return this.http.post("/api/crWlt",formdata);
  }
}
