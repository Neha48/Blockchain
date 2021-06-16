import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BlockServiceService } from './block-service.service';
import { DetailDialogComponent } from './detaildialog/detaildialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { KeyDialogComponent } from './keydialog/keydialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  blocks:any=[];
  mines:any=[];
  chain:any=[];
  minechain:any=[];
  keys:any;
  amountForm:FormGroup;
  constructor(private service:BlockServiceService,private formbuilder: FormBuilder,
    private dialog:MatDialog){
    
  }
  ngOnInit(){
    this.service.getBlocks().subscribe(
      res=>{this.blocks=res;   this.mines=this.blocks.mined;this.chain=this.blocks.chain; 
        for(var i=0;i<this.chain.length;i++){
          this.minechain[i]={mine:this.mines[i],chain:this.chain[i]}
        };
        console.log(this.blocks);}
      ,HttpErrorResponse=>{console.error(HttpErrorResponse)});
    this.amountForm=this.formbuilder.group({
      amt :['',Validators.required],
      test :[10]
    });
  }
  openDialog(event){
    // var copy;
    // var t=event.target||event.srcElement||event.currentTarget;
    // console.log(t);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    
    console.log(dialogConfig.data);
    let dialogref = this.dialog.open(DialogComponent,dialogConfig);
    dialogref.afterClosed().subscribe(val=>{
      console.log(val);
    })
  }
  createWallet(){
    console.log("hi");
    this.service.create('name').subscribe(
      res=>{this.keys=res;
        const dialogConfig=new MatDialogConfig();
        dialogConfig.autoFocus=true;
        dialogConfig.data={
          keys:this.keys
        }; console.log(dialogConfig.data);
        this.dialog.open(KeyDialogComponent,dialogConfig);},
      (err:HttpErrorResponse)=>console.error(err));
  }
  onSubmit(){
    // console.log(this.amountForm.get("amt").value);
      if(this.amountForm.valid){
        // formData.set("amt",this.amountForm.get("amt").value);;
        this.service.send(this.amountForm.value).subscribe(res=>{console.log(res);},(err:HttpErrorResponse)=>{console.log(err)});
      }
      else
        console.log("err");
      // this.amountForm.resetForm();

  }
  openDetails(i){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.data=i;
    console.log(dialogConfig.data);
    let dialogref = this.dialog.open(DetailDialogComponent,dialogConfig);
  }
}
