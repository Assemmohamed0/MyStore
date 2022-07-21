import { Injectable } from '@angular/core';

// importing HttpClient to enable fetching data
import { HttpClient } from '@angular/common/http';

// importing Models
import { Products } from '../models/Products';
import { ProductsPurchased } from '../models/ProductsPurchased';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // class Properties
  allProducts:Products[] = [];
  productsPurchased:ProductsPurchased[] = [];
  allUsers:Users[] = [];
  totalPrice:number = 0;

  constructor(private http:HttpClient) {

   }


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

  /*-----------------------------------------------------(total price)-----------------------------------------------------*/

  // calculate total price
  calculateTotalPrice()
  {
    this.totalPrice = 0;
    for(let i=0 ; i<this.productsPurchased.length ; i++)
    {
      this.totalPrice += this.productsPurchased[i].totalPrice;
    }
    return this.totalPriceGetter;
  }

  // return total price
  get totalPriceGetter()
  {
    return this.totalPrice;
  }

  /*-----------------------------------------------------(products purchased)-----------------------------------------------------*/

  // set all products purchased
  public set productsPurchasedSetter(productAmount:ProductsPurchased)
  {
    for (let i = 0; i < this.productsPurchased.length; i++) {
      if(this.productsPurchased[i].id == productAmount.id)
      {
        this.productsPurchased[i].amount = productAmount.amount;
        this.productsPurchased[i].totalPrice = productAmount.totalPrice;
        return;
      }
    }
      this.productsPurchased.push(productAmount);
  }

  // get all products purchased
  get productsPurchasedGetter()
  {
    return this.productsPurchased;
  }

  // reset all products purchased after confirmation
  resetProductsPurchased()
  {
    this.productsPurchased = [];
  }

  // to delete specific product from products purchased
  deleteProductPurchased(product:ProductsPurchased)
  {
    return this.productsPurchased = this.productsPurchased.filter(data => data != product);
  }

  /*-----------------------------------------------------(user info)-----------------------------------------------------*/

  // set all users submitted
  public set allUsersSetter(user:Users)
  {
    this.allUsers.push(user);
  }

  // get all users submitted
  get allUsersGetter()
  {
    return this.allUsers;
  }

  

}
