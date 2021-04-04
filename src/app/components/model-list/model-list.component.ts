import { Component, OnInit } from '@angular/core';
import { ModelDetailDto } from 'src/app/models/modelDetailDto';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
})
export class ModelListComponent implements OnInit {
  modelList: ModelDetailDto[];
  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.getModels();
  }

  getModels() {
    this.modelService.getModels().subscribe((response) => {
      this.modelList = response.data;
    });
  }
}
