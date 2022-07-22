import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit , OnDestroy {

  totalPrice:number = 0;
  fullName:string = "";
  constructor(private CartService:CartService) { }

  ngOnInit(): void {
    this.totalPrice = this.CartService.totalPriceGetter;
    this.fullName = this.CartService.allUsersGetter.slice(-1)[0].fullName;
  }

  ngOnDestroy(): void {
      this.CartService.resetProductsPurchased();
  }


}
