import { Component, OnInit } from '@angular/core';
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

}
