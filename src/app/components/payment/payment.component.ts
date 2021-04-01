import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carDetail: CarDetailDto;
  rental: Rental;
  payment: Payment;
  customerId: number;

  cardName: string;
  cardNumber: string;
  expirationDateMonth: number;
  expirationDateYear: number;
  cardDate: string;
  cardCvv: string;
  paymentAmount: number = 0;
  successPayment: boolean = false;

  paymentForm: FormGroup;
  constructor(
    private carDetailService: CarDetailService,
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
        this.getCarDetails(this.rental.carId);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  createPayment() {
    if (this.cardName == null) {
      this.toastrService.warning('Kart Sahibi bilgisini kontrol ediniz.');
    } else if (this.cardNumber == null) {
      this.toastrService.warning('Kart Numarası bilgisini kontrol ediniz.');
    } else if (
      this.expirationDateMonth == null ||
      this.expirationDateYear == null
    ) {
      this.toastrService.warning('Tarih Ay bilgisini kontrol ediniz.');
    } else if (this.cardCvv == null) {
      this.toastrService.warning('CVV bilgisini kontrol ediniz.');
    } else {
      this.payment = {
        carNameSurname: this.cardName,
        cardNumber: this.cardNumber,
        cardExpirationDateMonth: this.expirationDateMonth,
        cardExpirationDateYear: this.expirationDateYear,
        cardCvv: this.cardCvv,
      };

      this.paymentService.addPayment(this.payment).subscribe((response) => {
        if ((this.successPayment = response.success)) {
          this.toastrService.success(
            'Ödeme işlemi başarıyla gerçekleşti.',
            'Ödeme Başarılı'
          );
          this.router.navigate(['/rentals']);
        } else {
          this.toastrService.error(
            'Ödeme işlemi gerçekleştirilemedi',
            'Ödeme Başarısız'
          );
          this.router.navigate(['/cars']);
        }
      });
    }
  }

  totalAmount() {
    if (this.rental.returnDate != null) {
      var rentDate = new Date(this.rental.rentDate.toString());
      var returnDate = new Date(this.rental.returnDate.toString());
      var differenceDay = returnDate.getTime() - rentDate.getTime();

      var rentDay = Math.ceil(differenceDay / (1000 * 3600 * 24));
      this.paymentAmount = this.carDetail.dailyPrice * rentDay;

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
    if (this.expirationDateYear <= year && this.expirationDateMonth < month) {
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
