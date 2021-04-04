import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelComponent } from './components/model/model.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ModelListComponent } from './components/model-list/model-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ModelAddComponent } from './components/model-add/model-add.component';
import { ModelUpdateComponent } from './components/model-update/model-update.component';
import { ModelDeleteComponent } from './components/model-delete/model-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    CarFilterComponent,
    CarRentalComponent,
    PaymentComponent,
    CarAddComponent,
    CarListComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandListComponent,
    ModelListComponent,
    ColorListComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    ModelAddComponent,
    ModelUpdateComponent,
    ModelDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
