import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { DatePipe } from '@angular/common';

import { HomeComponent } from './home/Components/home/home.component';
import { ShopComponent } from './shop/Components/shop/shop.component';
import { ShopeDetailsComponent } from './shop-details/Components/shope-details/shope-details.component';
import { ShoppingCartComponent } from './shopping-cart/Components/shopping-cart/shopping-cart.component';
import { FavouriteComponent } from './favourite/Components/favourite/favourite.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';

const userRoutes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'shop/:ID', component: ShopComponent },
  { path: 'shop/brand/:IDTH', component: ShopComponent },
  { path: 'shop-details/:ID', component: ShopeDetailsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    // ... các component khác
    // CheckoutComponent,
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule
  ],
  providers: [DatePipe], // Thêm DatePipe vào mảng providers

  exports: [RouterModule]
})
export class UserInterfaceModule { }
