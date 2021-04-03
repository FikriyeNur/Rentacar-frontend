import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';
import { ColorService } from 'src/app/services/color.service';
import { ModelDetailDto } from 'src/app/models/modelDetailDto';
import { Color } from 'src/app/models/color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  isCarAdd: boolean = true;

  brands: Brand[];
  models: ModelDetailDto[];
  colors: Color[];
  brandFilter: number;
  modelFilter: number;
  colorFilter: number;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private modelService: ModelService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getModels();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe((response) => {
        if ((this.isCarAdd = response.success)) {
          this.toastrService.success('Araç başarıyla eklendi', 'Başarılı');
          this.router.navigate(['car/list']);
        } else {
          this.toastrService.error(
            'Araç eklerken hata meydana geldi!',
            'Başarısız'
          );
          this.router.navigate(['/cars']);
        }
      });
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

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedModel(modelId: number) {
    if (this.modelFilter == modelId) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) {
      return true;
    } else {
      return false;
    }
  }
}
