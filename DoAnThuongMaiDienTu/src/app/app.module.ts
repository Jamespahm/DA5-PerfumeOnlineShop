import { QlspComponent } from './Modules/admin-interface/qlsp/qlsp.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/Components/user-interface/header/header.component';
import { FooterComponent } from './Layout/Components/user-interface/footer/footer.component';
import { SlideInterfaceComponent } from './Layout/Components/user-interface/slide-interface/slide-interface.component';
import { HomeComponent } from './Modules/user-interface/home/Components/home/home.component';
import { HomeImportComponent } from './Modules/user-interface/home/Components/home-import/home-import.component';
import { ShopComponent } from './Modules/user-interface/shop/Components/shop/shop.component';
import { ShopImportComponent } from './Modules/user-interface/shop/Components/shop-import/shop-import.component';
import { LoginComponent } from './Modules/user-interface/login/login.component';
import { SignupComponent } from './Modules/user-interface/signup/signup.component';
import { AboutComponent } from './Modules/user-interface/about/about.component';
import { ContactComponent } from './Modules/user-interface/contact/contact.component';
import { BlogComponent } from './Modules/user-interface/blog/blog.component';
import { CheckoutComponent } from './Modules/user-interface/checkout/checkout.component';
import { ShopeDetailsComponent } from './Modules/user-interface/shop-details/Components/shope-details/shope-details.component';
import { ShopeDetailsImpotComponent } from './Modules/user-interface/shop-details/Components/shope-details-impot/shope-details-impot.component';
import { FavouriteComponent } from './Modules/user-interface/favourite/Components/favourite/favourite.component';
import { FavouriteImportComponent } from './Modules/user-interface/favourite/Components/favourite-import/favourite-import.component';
import { ShoppingCartComponent } from './Modules/user-interface/shopping-cart/Components/shopping-cart/shopping-cart.component';
import { ShoppingCartImportComponent } from './Modules/user-interface/shopping-cart/Components/shopping-cart-import/shopping-cart-import.component';
import { ShopService } from './Modules/user-interface/shop/shop.service';
import { ShopDetailsService } from './Modules/user-interface/shop-details/shop-details.service';
import { QlspService } from './Modules/admin-interface/qlsp/qlsp.service';

// import { FooterAdComponent } from 'src/app/Layout/Components/admin-interface/footer-ad/footer-ad.component';
// import { HeaderAdComponent } from 'src/app/Layout/Components/admin-interface/header-ad/header-ad.component';
// import { HomeadComponent } from 'src/app/Modules/admin-interface/homead/homead.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,  
    
    // HeaderAdComponent,
    // FooterAdComponent,
    // HomeadComponent,

    SlideInterfaceComponent,
    HomeComponent,
    HomeImportComponent,
    ShopComponent,
    ShopImportComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    CheckoutComponent,
    ShopeDetailsComponent,
    ShopeDetailsImpotComponent,
    FavouriteComponent,
    FavouriteImportComponent,
    ShoppingCartComponent,
    ShoppingCartImportComponent,
    // PaginationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), /*...*/
    FormsModule
  ],
  providers: [
    ShopService,
    ShopDetailsService,
    QlspService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
