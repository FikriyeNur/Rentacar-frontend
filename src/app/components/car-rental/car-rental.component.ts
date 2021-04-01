import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
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
  paymentAmount: number;
  rentDay: number;

  constructor(
    private carDetailService: CarDetailService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    let createdRental: RentalDetailDto = {
      carId: this.carDetail.carId,
      brandName: this.carDetail.brandName,
      modelName: this.carDetail.modelName,
      dailyPrice: this.carDetail.dailyPrice,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
    };

    if (this.rentDate == null) {
      this.toastrService.warning(
        'Lütfen araç kiralama tarihi seçiniz!',
        'Hata'
      );
    } else if (this.customerId == null) {
      this.toastrService.warning('Lütfen müşteri seçiniz!', 'Hata');
    } else if (this.returnDate == null) {
      this.toastrService.warning('Lütfen araç teslim tarihi seçiniz!', 'Hata');
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
      this.router.navigate(['/payment/', JSON.stringify(createdRental)]);
    } else if (this.isAvailable == false) {
      this.toastrService.error(
        'Araç kiralama işlemi gerçekleştirilemedi!',
        'Araç Kullanımda'
      );
    }
  }

  totalAmount() {
    if (this.returnDate != null) {
      var returnDate = new Date(this.returnDate.toString());
      var rentDate = new Date(this.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.paymentAmount = rentDays * this.carDetail.dailyPrice;
    }
  }
}
