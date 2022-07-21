import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit , OnDestroy {

  totalPrice:number = 0;
  fullName:string = "";
  constructor(private ProductsService:ProductsService) { }

  ngOnInit(): void {
    this.totalPrice = this.ProductsService.totalPriceGetter;
    this.fullName = this.ProductsService.allUsersGetter.slice(-1)[0].fullName;
  }

  ngOnDestroy(): void {
      this.ProductsService.resetProductsPurchased();
  }


}
