import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MaterialTopicFormService, MaterialTopicFormGroup } from './material-topic-form.service';
import { IMaterialTopic } from '../material-topic.model';
import { MaterialTopicService } from '../service/material-topic.service';
import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';
import { MaterialTopicLevelService } from 'app/entities/material-topic-level/service/material-topic-level.service';

@Component({
  selector: 'jhi-material-topic-update',
  templateUrl: './material-topic-update.component.html',
})
export class MaterialTopicUpdateComponent implements OnInit {
  isSaving = false;
  materialTopic: IMaterialTopic | null = null;

  materialTopicLevelsSharedCollection: IMaterialTopicLevel[] = [];

  editForm: MaterialTopicFormGroup = this.materialTopicFormService.createMaterialTopicFormGroup();

  constructor(
    protected materialTopicService: MaterialTopicService,
    protected materialTopicFormService: MaterialTopicFormService,
    protected materialTopicLevelService: MaterialTopicLevelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMaterialTopicLevel = (o1: IMaterialTopicLevel | null, o2: IMaterialTopicLevel | null): boolean =>
    this.materialTopicLevelService.compareMaterialTopicLevel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialTopic }) => {
      this.materialTopic = materialTopic;
      if (materialTopic) {
        this.updateForm(materialTopic);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materialTopic = this.materialTopicFormService.getMaterialTopic(this.editForm);
    if (materialTopic.id !== null) {
      this.subscribeToSaveResponse(this.materialTopicService.update(materialTopic));
    } else {
      this.subscribeToSaveResponse(this.materialTopicService.create(materialTopic));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialTopic>>): void {
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

  protected updateForm(materialTopic: IMaterialTopic): void {
    this.materialTopic = materialTopic;
    this.materialTopicFormService.resetForm(this.editForm, materialTopic);

    this.materialTopicLevelsSharedCollection =
      this.materialTopicLevelService.addMaterialTopicLevelToCollectionIfMissing<IMaterialTopicLevel>(
        this.materialTopicLevelsSharedCollection,
        materialTopic.materialTopicLevel
      );
  }

  protected loadRelationshipsOptions(): void {
    this.materialTopicLevelService
      .query()
      .pipe(map((res: HttpResponse<IMaterialTopicLevel[]>) => res.body ?? []))
      .pipe(
        map((materialTopicLevels: IMaterialTopicLevel[]) =>
          this.materialTopicLevelService.addMaterialTopicLevelToCollectionIfMissing<IMaterialTopicLevel>(
            materialTopicLevels,
            this.materialTopic?.materialTopicLevel
          )
        )
      )
      .subscribe((materialTopicLevels: IMaterialTopicLevel[]) => (this.materialTopicLevelsSharedCollection = materialTopicLevels));
  }
}
