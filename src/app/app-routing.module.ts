import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"" , component:ProductListComponent},
  {path:"details/:id" , component:ProductItemDetailComponent , canActivate:[AuthGuard]},
  {path:"cart" , component:CartComponent},
  {path:"confirmation" , component:ConfirmationComponent},
  {path:"**" , redirectTo:'/' , pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
