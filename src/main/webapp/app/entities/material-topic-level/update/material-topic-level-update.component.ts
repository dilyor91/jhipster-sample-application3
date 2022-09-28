import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MaterialTopicLevelFormService, MaterialTopicLevelFormGroup } from './material-topic-level-form.service';
import { IMaterialTopicLevel } from '../material-topic-level.model';
import { MaterialTopicLevelService } from '../service/material-topic-level.service';

@Component({
  selector: 'jhi-material-topic-level-update',
  templateUrl: './material-topic-level-update.component.html',
})
export class MaterialTopicLevelUpdateComponent implements OnInit {
  isSaving = false;
  materialTopicLevel: IMaterialTopicLevel | null = null;

  editForm: MaterialTopicLevelFormGroup = this.materialTopicLevelFormService.createMaterialTopicLevelFormGroup();

  constructor(
    protected materialTopicLevelService: MaterialTopicLevelService,
    protected materialTopicLevelFormService: MaterialTopicLevelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialTopicLevel }) => {
      this.materialTopicLevel = materialTopicLevel;
      if (materialTopicLevel) {
        this.updateForm(materialTopicLevel);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materialTopicLevel = this.materialTopicLevelFormService.getMaterialTopicLevel(this.editForm);
    if (materialTopicLevel.id !== null) {
      this.subscribeToSaveResponse(this.materialTopicLevelService.update(materialTopicLevel));
    } else {
      this.subscribeToSaveResponse(this.materialTopicLevelService.create(materialTopicLevel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialTopicLevel>>): void {
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

  protected updateForm(materialTopicLevel: IMaterialTopicLevel): void {
    this.materialTopicLevel = materialTopicLevel;
    this.materialTopicLevelFormService.resetForm(this.editForm, materialTopicLevel);
  }
}
