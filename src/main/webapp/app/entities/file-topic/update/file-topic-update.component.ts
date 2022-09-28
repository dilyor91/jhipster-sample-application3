import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FileTopicFormService, FileTopicFormGroup } from './file-topic-form.service';
import { IFileTopic } from '../file-topic.model';
import { FileTopicService } from '../service/file-topic.service';
import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';
import { MaterialTopicLevelService } from 'app/entities/material-topic-level/service/material-topic-level.service';

@Component({
  selector: 'jhi-file-topic-update',
  templateUrl: './file-topic-update.component.html',
})
export class FileTopicUpdateComponent implements OnInit {
  isSaving = false;
  fileTopic: IFileTopic | null = null;

  materialTopicLevelsSharedCollection: IMaterialTopicLevel[] = [];

  editForm: FileTopicFormGroup = this.fileTopicFormService.createFileTopicFormGroup();

  constructor(
    protected fileTopicService: FileTopicService,
    protected fileTopicFormService: FileTopicFormService,
    protected materialTopicLevelService: MaterialTopicLevelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMaterialTopicLevel = (o1: IMaterialTopicLevel | null, o2: IMaterialTopicLevel | null): boolean =>
    this.materialTopicLevelService.compareMaterialTopicLevel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fileTopic }) => {
      this.fileTopic = fileTopic;
      if (fileTopic) {
        this.updateForm(fileTopic);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fileTopic = this.fileTopicFormService.getFileTopic(this.editForm);
    if (fileTopic.id !== null) {
      this.subscribeToSaveResponse(this.fileTopicService.update(fileTopic));
    } else {
      this.subscribeToSaveResponse(this.fileTopicService.create(fileTopic));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFileTopic>>): void {
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

  protected updateForm(fileTopic: IFileTopic): void {
    this.fileTopic = fileTopic;
    this.fileTopicFormService.resetForm(this.editForm, fileTopic);

    this.materialTopicLevelsSharedCollection =
      this.materialTopicLevelService.addMaterialTopicLevelToCollectionIfMissing<IMaterialTopicLevel>(
        this.materialTopicLevelsSharedCollection,
        fileTopic.materialTopicLevel
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
            this.fileTopic?.materialTopicLevel
          )
        )
      )
      .subscribe((materialTopicLevels: IMaterialTopicLevel[]) => (this.materialTopicLevelsSharedCollection = materialTopicLevels));
  }
}
