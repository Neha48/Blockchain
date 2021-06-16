import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockServiceService } from '../block-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './keydialog.component.html',
  styles:[
    `p {
        color: darkgray;
        font-size:10px;
       }`
  ]
//   styleUrls: ['./dialog.component.css']
})
export class KeyDialogComponent implements OnInit {
    publicKey: any;
    privateKey: any;
    constructor(private service:BlockServiceService,@Inject(MAT_DIALOG_DATA) data,private dialogRef:MatDialogRef<KeyDialogComponent>) {
        this.publicKey=data.keys.PublicKey;
        this.privateKey=data.keys.PrivateKey;
    } 
    ngOnInit(): void {
        console.log(this.publicKey);
    }
}