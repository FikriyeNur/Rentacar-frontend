import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ModelAddComponent } from './components/model-add/model-add.component';
import { ModelDeleteComponent } from './components/model-delete/model-delete.component';
import { ModelListComponent } from './components/model-list/model-list.component';
import { ModelUpdateComponent } from './components/model-update/model-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/list', component: CarListComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'car/update/:carId', component: CarUpdateComponent },
  { path: 'car/delete/:carId', component: CarDeleteComponent },

  { path: 'brand/list', component: BrandListComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'brand/update/:brandId', component: BrandUpdateComponent },
  { path: 'brand/delete/:brandId', component: BrandDeleteComponent },

  { path: 'model/list', component: ModelListComponent },
  { path: 'model/add', component: ModelAddComponent },
  { path: 'model/update/:modelId', component: ModelUpdateComponent },
  { path: 'model/delete/:modelId', component: ModelDeleteComponent },

  { path: 'color/list', component: ColorListComponent },
  { path: 'color/add', component: ColorAddComponent },
  { path: 'color/update/:colorId', component: ColorUpdateComponent },
  { path: 'color/delete/:colorId', component: ColorDeleteComponent },

  { path: 'customers', component: CustomerComponent },
  
  { path: 'rentals', component: RentalComponent },
  { path: 'carrental/:carId', component: CarRentalComponent },
  { path: 'payment/:rental', component: PaymentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
