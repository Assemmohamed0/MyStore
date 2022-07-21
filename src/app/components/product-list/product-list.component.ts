import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../models/Products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // class properties
  productList:Products[];
  // product added details
  productName:string = '';
  productAmount:number = 0;
  // show modal when adding new product
  @ViewChild('modalBtn') myButton : ElementRef | undefined;

  constructor(private ProductsService:ProductsService) {
    this.productList=[{
      description : "",
        id : 0,
        name : "",
        price : 0.0,
        url : ""
    }];
   }

  ngOnInit(): void {
    this.ProductsService.getProducts().subscribe((data)=>{this.productList = data});
  }

  // to alert product details
  productDetailsAdded(productDetails:any)
  {
    this.productName = productDetails.productName;
    this.productAmount = productDetails.amount;
    this.triggerClick();
  }

  // show alert
  triggerClick()
  {
    let el: HTMLElement = this.myButton?.nativeElement as HTMLElement;
    el.click();
  }

}
