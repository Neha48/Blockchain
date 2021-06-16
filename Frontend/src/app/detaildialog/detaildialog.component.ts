import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockServiceService } from '../block-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './detaildialog.component.html',
  styles:[
    `p {
        color: darkgray;
        font-size:8px;
       }`
  ]
//   styleUrls: ['./dialog.component.css']
})
export class DetailDialogComponent implements OnInit {
    sender: any;
    receiver: any;
    amount:number;
    nonce:number;
    time:Date;
    prevHash:any;
    constructor(@Inject(MAT_DIALOG_DATA) data,private dialogRef:MatDialogRef<DetailDialogComponent>) {
        this.sender=data.transaction.payer;
        this.receiver=data.transaction.payee;
        this.amount=data.transaction.amount;
        this.nonce=data.nonce;
        this.time=new Date(data.ts);
        this.prevHash=data.prevHash||'-----';
    } 
    ngOnInit(): void {
    }
}