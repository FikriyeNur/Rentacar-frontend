import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModelDetailDto } from 'src/app/models/modelDetailDto';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model-delete',
  templateUrl: './model-delete.component.html',
  styleUrls: ['./model-delete.component.css'],
})
export class ModelDeleteComponent implements OnInit {
  modelDeleteForm: FormGroup;
  model: ModelDetailDto;
  disableSelect: boolean = true;

  constructor(
    private modelService: ModelService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['modelId']) {
        this.getModelById(params['modelId']);
      }
    });
  }

  createModelDeleteForm(model: ModelDetailDto) {
    this.modelDeleteForm = this.formBuilder.group({
      modelId: [model.modelId, Validators.required],
      brandName: [model.brandName, Validators.required],
      modelName: [model.modelName, Validators.required],
    });
  }

  getModelById(modelId: number) {
    this.modelService.getByDetailId(modelId).subscribe((response) => {
      this.model = response.data;
      this.createModelDeleteForm(this.model);
    });
  }

  deleteModel() {
    if (this.modelDeleteForm.valid) {
      let modelModel = Object.assign({}, this.modelDeleteForm.value);
      this.modelService.delete(modelModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['model/list']);
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
