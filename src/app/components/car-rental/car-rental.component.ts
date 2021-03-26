import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
})
export class CarRentalComponent implements OnInit {
  carDetails:CarDetailDto;

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

}
