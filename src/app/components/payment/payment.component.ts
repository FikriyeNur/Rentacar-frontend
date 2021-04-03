import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
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
  rental: Rental;
  creditCard: CreditCard;
  customer: CustomerDetailDto;
  customerId: number;

  paymentForm: FormGroup;

  cardName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cardDate: string;
  cardCvv: string;
  paymentAmount: number = 0;
  successPayment: boolean = false;

  constructor(
    private carService: CarService,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.customerId = JSON.parse(params['rental']).customerId;
        this.getCarDetails(this.rental.carId);
        this.paymentAmount = JSON.parse(params['rental']).totalPrice;
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCreditCard(cardId: number) {
    this.paymentService.getPaymentById(cardId).subscribe((response) => {
      this.creditCard = response.data;
    });
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNameSurname: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpirationMonth: ['', Validators.required],
      cardExpirationYear: ['', Validators.required],
      cardSecurityNumber: ['', Validators.required],
     // cardLimit: ['4000', Validators.required],
    });
  }

  addCreditCard() {
    if (this.paymentForm) {
      let cardModel = Object.assign({}, this.paymentForm.value);
      this.paymentService.add(cardModel).subscribe((response) => {
        this.toastrService.success('Ödeme işlemi başarılı', 'BAŞARILI');
      });
    } else {
      this.toastrService.error('Kart Bilgilerinizi Kontrol Ediniz', 'HATA!');
    }
  }

  createPayment() {
    if (this.cardName == null) {
      this.toastrService.warning('Kart Sahibi bilgisini kontrol ediniz.');
    } else if (this.cardNumber == null) {
      this.toastrService.warning('Kart Numarası bilgisini kontrol ediniz.');
    } else if (this.expirationMonth == null || this.expirationYear == null) {
      this.toastrService.warning(
        'Son kullanma tarihi bilgisini kontrol ediniz.'
      );
    } else if (this.cardCvv == null) {
      this.toastrService.warning('CVV bilgisini kontrol ediniz.');
    }
    this.creditCard = {
      cardNameSurname: this.cardName,
      cardNumber: this.cardNumber,
      cardExpirationMonth: this.expirationMonth,
      cardExpirationYear: this.expirationYear,
      cardSecurityNumber: this.cardCvv,
    };

    this.paymentService.getPayment().subscribe((response) => {
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

  // dateControl() {
  //   var year = new Date().getFullYear().toString();
  //   var month = new Date().getMonth().toString();
  //   if (this.expirationYear <= year && this.expirationMonth < month) {
  //     this.toastrService.warning(
  //       'Son kullanma tarihini kontrol ediniz.',
  //       'Dikkat'
  //     );
  //     return false;
  //   } else return true;
  // }

  // getMinYear() {
  //   var year = new Date().getFullYear();
  //   return year;
  // }

  cancelButton() {
    this.toastrService.warning(
      'Kiralama sayfasına geri dönülüyor...',
      'Ödeme İşlemi İptal Edildi.'
    );
    this.router.navigate(['/cars/details/' + this.carDetail.carId]);
  }
}
