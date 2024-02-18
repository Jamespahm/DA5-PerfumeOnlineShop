import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../../app/app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { DatePipe } from '@angular/common';

import { HomeadComponent } from './homead/homead.component';
import { FooterAdComponent } from 'src/app/Layout/Components/admin-interface/footer-ad/footer-ad.component';
import { HeaderAdComponent } from 'src/app/Layout/Components/admin-interface/header-ad/header-ad.component';
import { QlspComponent } from './qlsp/qlsp.component';
import { QlhdComponent } from './qlhd/qlhd.component';
import { QlkhComponent } from './qlkh/qlkh.component';
import { QlspService } from './qlsp/qlsp.service';
import { AddProductComponent } from './qlsp/add-product/add-product.component';
import { EditProductComponent } from './qlsp/edit-product/edit-product.component';
import { AddIvoiceComponent } from './qlhd/add-ivoice/add-ivoice.component';
import { EditIvoiceComponent } from './qlhd/edit-ivoice/edit-ivoice.component';
import { QlcthdService } from './qlcthd/qlcthd.service';
import { QlhdService } from './qlhd/qlhd.service';
import { AddCustomerComponent } from './qlkh/add-customer/add-customer.component';
import { EditCustomerComponent } from './qlkh/edit-customer/edit-customer.component';
import { QlcthdComponent } from './qlcthd/qlcthd.component';
import { AddIvoicedetailComponent } from './qlcthd/add-ivoicedetail/add-ivoicedetail.component';
import { EditIvoicedetailComponent } from './qlcthd/edit-ivoicedetail/edit-ivoicedetail.component';

const adminRoutes: Routes = [
  { path: '', redirectTo: 'homead', pathMatch: 'full' },
  { path: 'homead', component: HomeadComponent },
  { path: 'qlsp', component: QlspComponent },
  { path: 'qlkh', component: QlkhComponent },
  { path: 'qlhd', component: QlhdComponent },
  { path: 'qlcthd', component: QlcthdComponent },
  { path: 'qlsp/add-product', component: AddProductComponent },
  { path: 'qlsp/edit-product/:id', component: EditProductComponent },
  { path: 'qlhd/add-ivoice', component: AddIvoiceComponent },
  { path: 'qlhd/edit-ivoice/:id', component: EditIvoiceComponent },
  { path: 'qlkh/add-customer', component: AddCustomerComponent },
  { path: 'qlkh/edit-customer/:id', component: EditCustomerComponent },
  { path: 'qlcthd/add-ivoicedetail', component: AddIvoicedetailComponent },
  { path: 'qlcthd/edit-ivoicedetail/:id', component: EditIvoicedetailComponent },

];

@NgModule({
  declarations: [
    HomeadComponent,
    FooterAdComponent,
    HeaderAdComponent,
    QlspComponent,
    QlhdComponent,
    QlkhComponent,
    AddProductComponent,
    EditProductComponent,
    AddIvoiceComponent,
    EditIvoiceComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    QlcthdComponent,
    AddIvoicedetailComponent,
    EditIvoicedetailComponent
  ],
  imports: [RouterModule.forChild(adminRoutes), CommonModule, FormsModule],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [QlspService, QlhdService, QlcthdService, DatePipe],
})
export class AdminInterfaceModule {}
