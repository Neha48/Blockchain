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
    keys:any;
    constructor(private service:BlockServiceService,@Inject(MAT_DIALOG_DATA) data,private dialogRef:MatDialogRef<KeyDialogComponent>) {
        this.publicKey=data.keys.PublicKey;
        this.privateKey=data.keys.PrivateKey;
        this.keys=data.keys;
    } 
    ngOnInit(): void {
        console.log(this.publicKey);
        this.downloadTxt();
    }
    private setting = {
        element: {
          dynamicDownload: null as HTMLElement
        }
      }
    downloadTxt() {
    //     this.dyanmicDownloadByHtmlTag({
    //         fileName: 'My Report.json',
    //         text: JSON.stringify(this.keys)
    //     });
    //   }
    // private dyanmicDownloadByHtmlTag(arg: {
    //     fileName: string,
    //     text: string
    //   }) {
        if (!this.setting.element.dynamicDownload) {
          this.setting.element.dynamicDownload = document.createElement('a');
        }
        const element = this.setting.element.dynamicDownload;
        const fileName = 'Key.json';// arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
        element.setAttribute('href', `data:json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.keys))}`);
        element.setAttribute('download', fileName);
    
        var event = new MouseEvent("click");
        element.dispatchEvent(event);
      }
}