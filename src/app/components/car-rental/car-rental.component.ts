import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { CarService } from 'src/app/services/car.service';
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
  customerName: string;
  customerSurname: string;

  rentDate: Date;
  returnDate: Date;
  minDate: string;
  maxDate: string;
  maxMinDate: string;
  paymentAmount: number;
  firstDateSelected: boolean = false;
  isAvailable: boolean = false;

  constructor(
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    this.carService.getCarDetails(carId).subscribe((response) => {
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

  rentEndChangeEvent(event: any) {
    this.returnDate = event.target.value;
    this.totalAmount();
  }

  checkAvailability(carId: number) {
    this.rentalService.isCarAvailable(carId).subscribe((response) => {
      this.isAvailable = response.success;
    });
  }

  totalAmount() {
    if (this.rentDate != null && this.returnDate != null) {
      var returnDate = new Date(this.returnDate.toString());
      var rentDate = new Date(this.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var rentDay = Math.ceil(difference / (1000 * 3600 * 24));

      this.paymentAmount = rentDay * this.carDetail.dailyPrice;
    }
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
      totalPrice: this.paymentAmount,
    };

    if (this.rentDate == null) {
      this.toastrService.warning(
        'L??tfen ara?? kiralama tarihi se??iniz!',
        'Hata'
      );
    } else if (this.customerId == null) {
      this.toastrService.warning('L??tfen m????teri se??iniz!', 'Hata');
    } else if (this.returnDate == null) {
      this.toastrService.warning('L??tfen ara?? teslim tarihi se??iniz!', 'Hata');
    } else if (this.rentDate > this.returnDate) {
      this.toastrService.warning(
        'Ara?? teslim tarihi ara?? kiralama tarihinden ??nce olamaz!',
        'Hatal?? Tarih'
      );
    }else if (this.rentDate == this.returnDate) {
      this.toastrService.warning(
        'Ara?? kiralama i??lemi en az 1 g??n olamal??!',
        'Hatal?? Tarih'
      );
    } 
    else if (this.isAvailable == true) {
      this.toastrService.info(
        '??deme sayfas??na y??nlendiriliyorsunuz. L??tfen bekleyiniz.',
        '??deme ????lemleri'
      );
      this.router.navigate(['/payment/', JSON.stringify(createdRental)]);
    }
  }
}
