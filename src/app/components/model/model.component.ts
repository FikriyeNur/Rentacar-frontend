import { Component, OnInit } from '@angular/core';
import { ModelDetailDto } from 'src/app/models/modelDetailDto';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  models: ModelDetailDto[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.modelService.getModels().subscribe(response =>{
      this.models = response.data;
    })
  }
}
