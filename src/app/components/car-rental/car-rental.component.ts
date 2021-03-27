import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
})
export class CarRentalComponent implements OnInit {
  cars: CarDetailDto[];
  carDetail: CarDetailDto;
  customers: CustomerDetailDto[];
  customerId: number;
  rentDate: Date;
  rentDateValue: Date;
  returnDate: Date;
  isRentBefore: boolean = false;
  rentalCar: RentalDetailDto;

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private router: Router,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetils(params['carId']);
        this.getCustomers();
        this.getRentalByCarId(params['carId']);
      }
    });
  }

  getCarDetils(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getRentalByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      if (response.data == null) {
        this.isRentBefore = false;
      } else {
        this.rentalCar = response.data;
        this.isRentBefore = true;
      }
    });
  }

  getMinRentDate() {
    var now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, 10);
  }

  getMinReturnDate() {
    var now = new Date();
    now.setDate(now.getDate() + 2);
    return now.toISOString().slice(0, 10);
  }

  checkAvailability() {
    if (!this.isRentBefore) {
      return true;
    } else {
      return this.rentedCeforeCarCheck();
    }
  }

  rentedCeforeCarCheck() {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    let today = formatDate(now, 'dd/MM/yyyy', 'tr');
    let oldDate = formatDate(this.rentalCar.returnDate, 'dd/MM/yyyy', 'tr');

    if (this.rentalCar.returnDate == null) {
      return false;
    } else if (oldDate > today) {
      return false;
    } else {
      return true;
    }
  }

  createRental() {
    let rental: Rental = {
      carId: this.cars[0].carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate ? this.returnDate : null,
    };
    this.paymentService.addToCart(rental);
    console.log(this.paymentService.listCart());

    this.router.navigate(['/payment']);
    this.toastrService.info(
      'Ödeme sayfasına yönlendiriliyorsunuz. Lütfen bekleyiniz.',
      'Ödeme İşlemleri'
    );
  }

  checkClick() {
    if (this.checkAvailability() == true) {
      if (this.rentDate == null || this.customerId == null) {
        this.toastrService.warning(
          'Araç kiralama tarihi ve müşteri seçiniz!',
          'Hata'
        );
      } else {
        if (this.returnDate == null || this.returnDate > this.rentDate) {
          this.toastrService.success(
            'Araç kiralama işlemi başarıyla gerçekleşti.',
            'Araç Kiralama'
          );
          this.createRental();
        } else if (this.returnDate < this.returnDate) {
          this.toastrService.error(
            'Araç teslim tarihi araç kiralama tarihinden küçük olamaz!',
            'Hata'
          );
        } else if (this.returnDate == this.rentDate) {
          this.toastrService.error(
            'Aracı kiralama işlemi en az 1 gün olmalı!',
            'Hata'
          );
        }
      }
    } else {
      this.toastrService.error(
        'Araç kiralama işlemi gerçekleştirilemedi!',
        'Araç Kullanımda'
      );
    }
  }
}
