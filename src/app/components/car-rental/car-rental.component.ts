import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
  providers: [DatePipe],
})
export class CarRentalComponent implements OnInit {
  carDetail: CarDetailDto;
  customers: CustomerDetailDto[];
  customer: CustomerDetailDto;
  customerId: number;

  rentDate: Date;
  returnDate: Date;
  minDate: string;
  maxDate: string;
  maxMinDate: string;
  firstDateSelected: boolean = false;
  isAvailable: boolean = false;

  constructor(
    private carDetailService: CarDetailService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetils(params['carId']);
        this.getCustomers();
        this.checkAvailability(params['carId']);
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

  getMinRentDate() {
    var today = new Date();
    today.setDate(today.getDate());
    return today.toISOString().slice(0, 10);
  }

  getMinReturnDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  checkAvailability(carId: number) {
    this.rentalService.isCarAvailable(carId).subscribe((response) => {
      this.isAvailable = response.success;
    });
  }

  createRental() {
    if (this.rentDate == null) {
      this.toastrService.warning(
        'Lütfen araç kiralama tarihi seçiniz!',
        'Hata'
      );
    } else if (this.customerId == null) {
      this.toastrService.warning('Lütfen müşteri seçiniz!', 'Hata');
    } else if (this.rentDate > this.returnDate) {
      this.toastrService.warning(
        'Araç teslim tarihi araç kiralama tarihinden önce olamaz!',
        'Hatalı Tarih'
      );
    } else if (this.isAvailable == true) {
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz. Lütfen bekleyiniz.',
        'Ödeme İşlemleri'
      );
      let paymentUrl = '/payment/' + this.carDetail.carId;
      this.router.navigate([paymentUrl]);
    } else if (this.isAvailable == false) {
      this.toastrService.error(
        'Araç kiralama işlemi gerçekleştirilemedi!',
        'Araç Kullanımda'
      );
    }
  }
}
