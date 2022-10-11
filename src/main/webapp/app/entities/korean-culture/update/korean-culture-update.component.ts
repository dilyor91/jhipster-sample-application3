import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { KoreanCultureFormService, KoreanCultureFormGroup } from './korean-culture-form.service';
import { IKoreanCulture } from '../korean-culture.model';
import { KoreanCultureService } from '../service/korean-culture.service';
import { KoreanCultureType } from 'app/entities/enumerations/korean-culture-type.model';

@Component({
  selector: 'jhi-korean-culture-update',
  templateUrl: './korean-culture-update.component.html',
})
export class KoreanCultureUpdateComponent implements OnInit {
  isSaving = false;
  koreanCulture: IKoreanCulture | null = null;
  koreanCultureTypeValues = Object.keys(KoreanCultureType);

  editForm: KoreanCultureFormGroup = this.koreanCultureFormService.createKoreanCultureFormGroup();

  constructor(
    protected koreanCultureService: KoreanCultureService,
    protected koreanCultureFormService: KoreanCultureFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ koreanCulture }) => {
      this.koreanCulture = koreanCulture;
      if (koreanCulture) {
        this.updateForm(koreanCulture);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const koreanCulture = this.koreanCultureFormService.getKoreanCulture(this.editForm);
    if (koreanCulture.id !== null) {
      this.subscribeToSaveResponse(this.koreanCultureService.update(koreanCulture));
    } else {
      this.subscribeToSaveResponse(this.koreanCultureService.create(koreanCulture));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKoreanCulture>>): void {
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

  protected updateForm(koreanCulture: IKoreanCulture): void {
    this.koreanCulture = koreanCulture;
    this.koreanCultureFormService.resetForm(this.editForm, koreanCulture);
  }
}
