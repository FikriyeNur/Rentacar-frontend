import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetailDto;
  carImages: CarImage[] = [];
  imageBasePath = 'https://localhost:44379/';
  dataLoaded: boolean = false;
  isCarAvail: boolean;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetails = response.data;
      console.log(this.carDetails);
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      console.log(response.data[0]);
    });
  }

  getImagePath(image: CarImage) {
    return this.imageBasePath + 'Images/' + image.imagePath;
  }

  // isCarAvailable(carId: number) {
  //   this.rentalService.isCarAvailable(carId).subscribe((response) => {
  //     this.isCarAvail = response;
  //     console.log(this.isCarAvailable);
  //   });
  // }
}
