import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Products } from '../../models/Products';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { ProductsPurchased } from '../../models/ProductsPurchased';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  // input to get data from parent to child
  @Input() product:Products;
  amount:number = 1;

  @Output() productNameContainer:EventEmitter<object> = new EventEmitter<object>();

  // to check whether the product were purchased or not
  purchasedFound?:ProductsPurchased;

  constructor(private router:Router , private CartService:CartService) {
    this.product={
      description : "",
        id : 0,
        name : "",
        price : 0.0,
        url : ""
    };
   }

  ngOnInit(): void {
    // to check whether the product were purchased or not to make amount equalls in each component and to get the right amount of product if it was purchased
    if(this.purchasedFound = this.CartService.productsPurchasedGetter.find( ({ id }) => id === Number(this.product.id) ))
    {
      this.amount = this.purchasedFound.amount;
    }
    
  }

  /*========================================================(Methods)========================================================*/

  // to set a product to products purchased
  setProductPurchased(selection:any)
  {
    this.CartService.productsPurchasedSetter = {

      description : this.product.description,
      id : this.product.id,
      name : this.product.name,
      price : this.product.price,
      url : this.product.url,
      amount : selection.value,
      totalPrice : this.product.price * selection.value
    };

    this.alertUser(selection.value);

  }

  // to alert user that product added successfully
  alertUser(amount:number)
  {
    this.productNameContainer.emit({productName: this.product.name, amount: amount});
  }

}
