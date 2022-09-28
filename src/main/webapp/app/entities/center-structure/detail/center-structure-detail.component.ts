import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICenterStructure } from '../center-structure.model';

@Component({
  selector: 'jhi-center-structure-detail',
  templateUrl: './center-structure-detail.component.html',
})
export class CenterStructureDetailComponent implements OnInit {
  centerStructure: ICenterStructure | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ centerStructure }) => {
      this.centerStructure = centerStructure;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
