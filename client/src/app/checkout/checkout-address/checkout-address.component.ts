import { Component, Input, OnInit } from '@angular/core';

import { AccountService } from 'src/app/account/account.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress()
  {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe(()=>{
        this.toastr.success('Address saved');
      },
      error => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }

}
