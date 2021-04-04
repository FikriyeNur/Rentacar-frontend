import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm: FormGroup;
  car: CarDetailDto;
  disableSelect: boolean = true;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }

  createCarDeleteForm(car: CarDetailDto) {
    this.carDeleteForm = this.formBuilder.group({
      carId: [car.carId, Validators.required],
      brandName: [car.brandName, Validators.required],
      modelName: [car.modelName, Validators.required],
      colorName: [car.colorName, Validators.required],
      modelYear: [car.modelYear, Validators.required],
      dailyPrice: [car.dailyPrice, Validators.required],
      description: [car.description, Validators.required],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.car = response.data;
      this.createCarDeleteForm(this.car);
    });
  }

  deleteCar() {
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);
      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.toastrService.info("Araç listesine yönlendiriliyorsunuz..", "Yönlendirme")
          setTimeout(()=>{
            this.router.navigate(['car/list']);
          }, 2000)
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
    }
  }
}
