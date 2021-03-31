import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carDetail: CarDetailDto;
  customer: CustomerDetailDto;
  rental: Rental = this.rentalService.rental;
  payment: Payment;

  rentDay: number;
  customerId: number;
  expirationDate: string;

  cardName: string;
  cardNumber: string;
  expirationDateMonth: number;
  expirationDateYear: number;
  cardDate: string;
  cardCvv: string;
  paymentAmount: number = 0;

  paymentForm: FormGroup;
  constructor(
    private carDetailService: CarDetailService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.customerId = JSON.parse(params['rental']).customerId;
        this.getCustomerById(this.customerId);
        this.getCarDetails(this.rental.carId);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCustomerById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data;
    });
  }

  createPayment() {
    if (this.cardName === undefined || !this.cardName) {
      this.toastrService.warning('Kart Sahibi bilgisini kontrol ediniz.');
    } else if (this.cardNumber === undefined || !this.cardNumber) {
      this.toastrService.warning('Kart Numarası bilgisini kontrol ediniz.');
    } else if (
      this.expirationDateMonth === undefined ||
      !this.expirationDateMonth
    ) {
      this.toastrService.warning('Tarih Ay bilgisini kontrol ediniz.');
    } else if (
      this.expirationDateYear === undefined ||
      !this.expirationDateYear
    ) {
      this.toastrService.warning('Tarih Yıl bilgisini kontrol ediniz.');
    } else if (this.cardCvv === undefined || !this.cardCvv) {
      this.toastrService.warning('CVV bilgisini kontrol ediniz.');
    } else {
      this.payment = {
        carNameSurname: this.cardName,
        cardNumber: this.cardNumber,
        cardExpirationDateMonth: this.expirationDateMonth,
        cardExpirationDateYear: this.expirationDateYear,
        cardCvv: this.cardCvv,
        cardLimit: this.paymentAmount,
      };
    }

    this.paymentService.addPayment(this.payment).subscribe((response) => {
      this.toastrService.success(
        'Ödeme işlemi başarıyla gerçekleşti.',
        'Ödeme Başarılı'
      );
      console.log(this.rental);

      this.rentalService.add(this.rental).subscribe((response) => {
        this.toastrService.success(
          response.messages.toString(),
          'Kiralama Başarılı'
        );
        this.router.navigate(['/rentals']);
      });
    });
  }

  totalAmount() {
    if (this.rental.returnDate != null) {
      var rentDate = new Date(this.rental.rentDate.toString());
      var returnDate = new Date(this.rental.returnDate.toString());
      var differenceDay = returnDate.getTime() - rentDate.getTime();

      this.rentDay = Math.ceil(differenceDay / (1000 * 3600 * 24));
      this.paymentAmount = this.carDetail.dailyPrice * this.rentDay;

      if (this.paymentAmount <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Ana sayfaya yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  dateControl() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    if (
      (this.expirationDateYear <= year && this.expirationDateMonth < month) ||
      !this.expirationDateYear ||
      !this.expirationDateMonth
    ) {
      this.toastrService.warning(
        'Son kullanma tarihini kontrol ediniz.',
        'Dikkat'
      );
      return false;
    } else return true;
  }

  getMinYear() {
    var year = new Date().getFullYear();
    return year;
  }

  cancelButton() {
    this.toastrService.warning(
      'Kiralama sayfasına geri dönülüyor...',
      'Ödeme İşlemi İptal Edildi.'
    );
    this.router.navigate(['/cars/details/' + this.carDetail.carId]);
  }
}
