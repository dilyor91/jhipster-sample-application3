import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FileFormService, FileFormGroup } from './file-form.service';
import { IFile } from '../file.model';
import { FileService } from '../service/file.service';
import { IInstitution } from 'app/entities/institution/institution.model';
import { InstitutionService } from 'app/entities/institution/service/institution.service';
import { IStudyAtKorea } from 'app/entities/study-at-korea/study-at-korea.model';
import { StudyAtKoreaService } from 'app/entities/study-at-korea/service/study-at-korea.service';
import { FileEntity } from 'app/entities/enumerations/file-entity.model';

@Component({
  selector: 'jhi-file-update',
  templateUrl: './file-update.component.html',
})
export class FileUpdateComponent implements OnInit {
  isSaving = false;
  file: IFile | null = null;
  fileEntityValues = Object.keys(FileEntity);

  institutionsSharedCollection: IInstitution[] = [];
  studyAtKoreasSharedCollection: IStudyAtKorea[] = [];

  editForm: FileFormGroup = this.fileFormService.createFileFormGroup();

  constructor(
    protected fileService: FileService,
    protected fileFormService: FileFormService,
    protected institutionService: InstitutionService,
    protected studyAtKoreaService: StudyAtKoreaService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitution = (o1: IInstitution | null, o2: IInstitution | null): boolean => this.institutionService.compareInstitution(o1, o2);

  compareStudyAtKorea = (o1: IStudyAtKorea | null, o2: IStudyAtKorea | null): boolean =>
    this.studyAtKoreaService.compareStudyAtKorea(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ file }) => {
      this.file = file;
      if (file) {
        this.updateForm(file);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const file = this.fileFormService.getFile(this.editForm);
    if (file.id !== null) {
      this.subscribeToSaveResponse(this.fileService.update(file));
    } else {
      this.subscribeToSaveResponse(this.fileService.create(file));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFile>>): void {
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

  protected updateForm(file: IFile): void {
    this.file = file;
    this.fileFormService.resetForm(this.editForm, file);

    this.institutionsSharedCollection = this.institutionService.addInstitutionToCollectionIfMissing<IInstitution>(
      this.institutionsSharedCollection,
      file.institution
    );
    this.studyAtKoreasSharedCollection = this.studyAtKoreaService.addStudyAtKoreaToCollectionIfMissing<IStudyAtKorea>(
      this.studyAtKoreasSharedCollection,
      file.studyAtKorea
    );
  }

  protected loadRelationshipsOptions(): void {
    this.institutionService
      .query()
      .pipe(map((res: HttpResponse<IInstitution[]>) => res.body ?? []))
      .pipe(
        map((institutions: IInstitution[]) =>
          this.institutionService.addInstitutionToCollectionIfMissing<IInstitution>(institutions, this.file?.institution)
        )
      )
      .subscribe((institutions: IInstitution[]) => (this.institutionsSharedCollection = institutions));

    this.studyAtKoreaService
      .query()
      .pipe(map((res: HttpResponse<IStudyAtKorea[]>) => res.body ?? []))
      .pipe(
        map((studyAtKoreas: IStudyAtKorea[]) =>
          this.studyAtKoreaService.addStudyAtKoreaToCollectionIfMissing<IStudyAtKorea>(studyAtKoreas, this.file?.studyAtKorea)
        )
      )
      .subscribe((studyAtKoreas: IStudyAtKorea[]) => (this.studyAtKoreasSharedCollection = studyAtKoreas));
  }
}
