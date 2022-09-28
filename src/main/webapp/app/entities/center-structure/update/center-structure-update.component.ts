import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CenterStructureFormService, CenterStructureFormGroup } from './center-structure-form.service';
import { ICenterStructure } from '../center-structure.model';
import { CenterStructureService } from '../service/center-structure.service';

@Component({
  selector: 'jhi-center-structure-update',
  templateUrl: './center-structure-update.component.html',
})
export class CenterStructureUpdateComponent implements OnInit {
  isSaving = false;
  centerStructure: ICenterStructure | null = null;

  editForm: CenterStructureFormGroup = this.centerStructureFormService.createCenterStructureFormGroup();

  constructor(
    protected centerStructureService: CenterStructureService,
    protected centerStructureFormService: CenterStructureFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ centerStructure }) => {
      this.centerStructure = centerStructure;
      if (centerStructure) {
        this.updateForm(centerStructure);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const centerStructure = this.centerStructureFormService.getCenterStructure(this.editForm);
    if (centerStructure.id !== null) {
      this.subscribeToSaveResponse(this.centerStructureService.update(centerStructure));
    } else {
      this.subscribeToSaveResponse(this.centerStructureService.create(centerStructure));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICenterStructure>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(centerStructure: ICenterStructure): void {
    this.centerStructure = centerStructure;
    this.centerStructureFormService.resetForm(this.editForm, centerStructure);
  }
}
