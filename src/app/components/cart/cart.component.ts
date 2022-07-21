import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductsPurchased } from '../../models/ProductsPurchased';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // class Properties
  allPurchasedProducts:ProductsPurchased[] = [];
  totalPrice:number = 0;
  // to ensure that amount is not minus
  amountError:boolean = false;
  // form builder to track and validate form inputs
  submissionForm:FormGroup;

  constructor(private fb:FormBuilder , private ProductsService:ProductsService , private router:Router) {
    this.submissionForm = this.fb.group({
      "fullName" : [null , [Validators.required , Validators.minLength(3)]],
      "address" : [null , [Validators.required , Validators.minLength(6)]],
      "creditCardNum" : [null , [Validators.required , Validators.pattern('^[0-9]{16}$')]],
    });
   }

  ngOnInit(): void {
    this.allPurchasedProducts = this.ProductsService.productsPurchasedGetter;
    this.totalPrice = this.ProductsService.calculateTotalPrice();
  }

  /*========================================================(Methods)========================================================*/

  // to submit order
  submitOrder()
  {
    this.ProductsService.allUsersSetter = {
      fullName:this.submissionForm.get('fullName')?.value,
      Address:this.submissionForm.get('address')?.value,
      creditCard:this.submissionForm.get('creditCardNum')?.value
    };
    this.submissionForm.reset();
    this.router.navigate(['/confirmation']);
  }

  // called when changing amount of products would be bought
  changeAmount(newAmountEvent:number , id:number)
  {
    if(newAmountEvent >0 )
    {
      this.ProductsService.productsPurchasedSetter = {
        description: this.allPurchasedProducts[id].description,
        id:this.allPurchasedProducts[id].id,
        name: this.allPurchasedProducts[id].name,
        price: this.allPurchasedProducts[id].price,
        url: this.allPurchasedProducts[id].url,
        amount:Number(newAmountEvent),
        totalPrice:Number(newAmountEvent)*this.allPurchasedProducts[id].price
      };
      // to reflect the changes
      this.allPurchasedProducts = this.ProductsService.productsPurchasedGetter;
      this.totalPrice = this.ProductsService.calculateTotalPrice();
    }
    else //if the amount is zero or less then delete the product
    {
      this.deleteProduct(this.allPurchasedProducts[id]);
    }
    
  }

  // to accept numbers only
  numberOnly(event:any): boolean 
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) ?  false :  true;
  }

  // to delete product from products purchased
  deleteProduct(product:ProductsPurchased)
  {
    this.allPurchasedProducts = this.ProductsService.deleteProductPurchased(product);
    this.totalPrice = this.ProductsService.calculateTotalPrice();
  }

}
