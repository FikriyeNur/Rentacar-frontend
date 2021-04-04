import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { ModelDetailDto } from 'src/app/models/modelDetailDto';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: Car;
  brands: Brand[];
  models: ModelDetailDto[];
  colors: Color[];
  disableSelect: boolean = true;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private modelService: ModelService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
        this.getBrands();
        this.getModels();
        this.getColors();
      }
    });
  }

  createCarUpdateForm(car: Car) {
    this.carUpdateForm = this.formBuilder.group({
      carId: [car.carId, Validators.required],
      brandId: [car.brandId, Validators.required],
      modelId: [car.modelId, Validators.required],
      colorId: [car.colorId, Validators.required],
      modelYear: [car.modelYear, Validators.required],
      dailyPrice: [car.dailyPrice, Validators.required],
      description: [car.description, Validators.required],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm(this.car);
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['car/list']);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error(
        'Formu eksiksiz doldurduğunuzdan emin olunuz!',
        'Hata'
      );
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getModels() {
    this.modelService.getModels().subscribe((response) => {
      this.models = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
