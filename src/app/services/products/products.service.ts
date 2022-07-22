import { Injectable } from '@angular/core';

// importing HttpClient to enable fetching data
import { HttpClient } from '@angular/common/http';

// importing Models
import { Products } from '../../models/Products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // class Properties
  allProducts:Products[] = [];


  constructor(private http:HttpClient) {}


  /*========================================================(Methods)========================================================*/

  /*-----------------------------------------------------(all products)-----------------------------------------------------*/

  // to fetch all products from json file
  getProducts()
  {
    this.http.get<Products[]>("assets/data.json").subscribe((dd)=>{this.allProductsSetter(dd)});
    return this.http.get<Products[]>("assets/data.json");
  }

  // to set all products
  allProductsSetter(data:any)
  {
    this.allProducts = data;
  }

  // to get all products
  get allProductsGetter()
  {
    return this.allProducts;
  }


}
