import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  carList: CarDetailDto[];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarList();
  }

  getCarList() {
    this.carService.getCars().subscribe((response) => {
      this.carList = response.data;
    });
  }
}
