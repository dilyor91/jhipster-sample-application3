import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StudyAtKoreaFormService, StudyAtKoreaFormGroup } from './study-at-korea-form.service';
import { IStudyAtKorea } from '../study-at-korea.model';
import { StudyAtKoreaService } from '../service/study-at-korea.service';

@Component({
  selector: 'jhi-study-at-korea-update',
  templateUrl: './study-at-korea-update.component.html',
})
export class StudyAtKoreaUpdateComponent implements OnInit {
  isSaving = false;
  studyAtKorea: IStudyAtKorea | null = null;

  editForm: StudyAtKoreaFormGroup = this.studyAtKoreaFormService.createStudyAtKoreaFormGroup();

  constructor(
    protected studyAtKoreaService: StudyAtKoreaService,
    protected studyAtKoreaFormService: StudyAtKoreaFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studyAtKorea }) => {
      this.studyAtKorea = studyAtKorea;
      if (studyAtKorea) {
        this.updateForm(studyAtKorea);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studyAtKorea = this.studyAtKoreaFormService.getStudyAtKorea(this.editForm);
    if (studyAtKorea.id !== null) {
      this.subscribeToSaveResponse(this.studyAtKoreaService.update(studyAtKorea));
    } else {
      this.subscribeToSaveResponse(this.studyAtKoreaService.create(studyAtKorea));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudyAtKorea>>): void {
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

  protected updateForm(studyAtKorea: IStudyAtKorea): void {
    this.studyAtKorea = studyAtKorea;
    this.studyAtKoreaFormService.resetForm(this.editForm, studyAtKorea);
  }
}
