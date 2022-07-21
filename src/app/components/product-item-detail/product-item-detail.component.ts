import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductsPurchased } from '../../models/ProductsPurchased';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  // class properties
  purchasedFound?:ProductsPurchased;
  productItem:any;
  amount:number = 1;
  id:any;

  constructor(private ProductsService:ProductsService , private activeRoute: ActivatedRoute) {
    this.productItem = {
        description : "",
        id : 0,
        name : "",
        price : 0.0,
        url : ""
    };

    // to get id written in URL
    this.id = this.activeRoute.snapshot.paramMap.get("id");    
  }

  ngOnInit(): void {
    
    // to get the present product details
    this.productItem = this.ProductsService.allProductsGetter.find( ({ id }) => id === Number(this.id) );

    // to check whether the product were purchased or not to make amount equalls in each component and to get the right amount of product if it was purchased
    if(this.purchasedFound = this.ProductsService.productsPurchasedGetter.find( ({ id }) => id === Number(this.id) ))
    {
      this.amount = this.purchasedFound.amount;
    }
    
  }

  /*========================================================(Methods)========================================================*/

  // to set a product to products purchased
  setProductPurchased(selection:any)
  {
    this.ProductsService.productsPurchasedSetter = {

      description : this.productItem.description,
      id : this.productItem.id,
      name : this.productItem.name,
      price : this.productItem.price,
      url : this.productItem.url,
      amount : selection.value,
      totalPrice : this.productItem.price * selection.value
    };
  }

}
