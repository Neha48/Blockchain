import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BlockServiceService } from '../block-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles:[`
    .right{float:right}
  `]
//   styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  amountForm=new FormGroup({
    recKey:new FormControl(''),amt:new FormControl('')
  });
  // amt:number;
  // recKey:String;
  constructor(private service:BlockServiceService,private formbuilder: FormBuilder,private dialogRef:MatDialogRef<DialogComponent>) { 
    
  }

  ngOnInit(): void {
    this.amountForm = this.formbuilder.group({
      amt:['',Validators.required],
      recKey:['',Validators.required],
    })
  }
  onSubmit(event){
    var t=event.target||event.srcElement||event.currentTarget;
    console.log(this.amountForm.get("recKey").value);
    console.log(this.amountForm.value);
    var response;
      if(this.amountForm.valid){
        console.log(this.amountForm.valid);
        // formData.set("amt",this.amountForm.get("amt").value);;
        this.service.send(this.amountForm.value).subscribe(
          res=>{response=res;
            alert("Transaction done!! Mined:"+response.Mined);},
        (err:HttpErrorResponse)=>{console.log(err)});
        this.dialogRef.close();
      }
      else
        console.log("err");

  }
  close(){
    this.dialogRef.close();
  }
}
