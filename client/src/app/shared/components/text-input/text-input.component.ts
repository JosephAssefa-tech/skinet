import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit,ControlValueAccessor {
  @ViewChild('input', {static: true}) input:ElementRef;
  @Input() type='text';
  @Input() lable:string;

  constructor(@Self() public controlDir: NgControl) {

    this.controlDir.valueAccessor=this;
   }
   ngOnInit() {
     const control=this.controlDir.control;
     const validators=control.validator ? [control.validator] : [];
     const asyncValidators=control.asyncValidator ? [control.asyncValidator] : [];

     control.setValidators(validators);
     control.setAsyncValidators(asyncValidators);
     control.updateValueAndValidity();
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onChange(event:any){

  }
  onTouchecd()
  {

  }
  registerOnChange(fn:any):void{
    this.onChange=fn;
  }



  registerOnTouched(fn: any): void {
    this.onTouchecd=fn;
  }




}
