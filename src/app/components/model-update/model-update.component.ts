import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model-update',
  templateUrl: './model-update.component.html',
  styleUrls: ['./model-update.component.css'],
})
export class ModelUpdateComponent implements OnInit {
  modelUpdateForm: FormGroup;
  model: Model;
  disableSelect: boolean = true;
  brands: Brand[];

  constructor(
    private modelService: ModelService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['modelId']) {
        this.getModelById(params['modelId']);
        this.getBrands();
      }
    });
  }

  createModelUpdateForm(model: Model) {
    this.modelUpdateForm = this.formBuilder.group({
      modelId: [model.modelId, Validators.required],
      brandId: [model.brandId, Validators.required],
      modelName: [model.modelName, Validators.required],
    });
  }

  getModelById(modelId: number) {
    this.modelService.getModelById(modelId).subscribe((response) => {
      this.model = response.data;
      this.createModelUpdateForm(this.model);
    });
  }

  updateModel() {
    if (this.modelUpdateForm.valid) {
      let modelModel = Object.assign({}, this.modelUpdateForm.value);
      this.modelService.update(modelModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.toastrService.info(
            'Araç listesine yönlendiriliyorsunuz..',
            'Yönlendirme'
          );
          setTimeout(() => {
            this.router.navigate(['model/list']);
          }, 2000);
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
}
