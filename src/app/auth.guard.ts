import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products/products.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ProductsService:ProductsService , private router:Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.ProductsService.allProducts.length==0)
      {
        this.router.navigate(['/'])
        return false;
      }
      else
      {
        return true
      }
   
  }
  
}
