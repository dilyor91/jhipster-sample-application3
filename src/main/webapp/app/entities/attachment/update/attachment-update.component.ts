import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AttachmentFormService, AttachmentFormGroup } from './attachment-form.service';
import { IAttachment } from '../attachment.model';
import { AttachmentService } from '../service/attachment.service';
import { IKoreanCulture } from 'app/entities/korean-culture/korean-culture.model';
import { KoreanCultureService } from 'app/entities/korean-culture/service/korean-culture.service';

@Component({
  selector: 'jhi-attachment-update',
  templateUrl: './attachment-update.component.html',
})
export class AttachmentUpdateComponent implements OnInit {
  isSaving = false;
  attachment: IAttachment | null = null;

  koreanCulturesSharedCollection: IKoreanCulture[] = [];

  editForm: AttachmentFormGroup = this.attachmentFormService.createAttachmentFormGroup();

  constructor(
    protected attachmentService: AttachmentService,
    protected attachmentFormService: AttachmentFormService,
    protected koreanCultureService: KoreanCultureService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareKoreanCulture = (o1: IKoreanCulture | null, o2: IKoreanCulture | null): boolean =>
    this.koreanCultureService.compareKoreanCulture(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attachment }) => {
      this.attachment = attachment;
      if (attachment) {
        this.updateForm(attachment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attachment = this.attachmentFormService.getAttachment(this.editForm);
    if (attachment.id !== null) {
      this.subscribeToSaveResponse(this.attachmentService.update(attachment));
    } else {
      this.subscribeToSaveResponse(this.attachmentService.create(attachment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttachment>>): void {
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

  protected updateForm(attachment: IAttachment): void {
    this.attachment = attachment;
    this.attachmentFormService.resetForm(this.editForm, attachment);

    this.koreanCulturesSharedCollection = this.koreanCultureService.addKoreanCultureToCollectionIfMissing<IKoreanCulture>(
      this.koreanCulturesSharedCollection,
      attachment.koreanCulture
    );
  }

  protected loadRelationshipsOptions(): void {
    this.koreanCultureService
      .query()
      .pipe(map((res: HttpResponse<IKoreanCulture[]>) => res.body ?? []))
      .pipe(
        map((koreanCultures: IKoreanCulture[]) =>
          this.koreanCultureService.addKoreanCultureToCollectionIfMissing<IKoreanCulture>(koreanCultures, this.attachment?.koreanCulture)
        )
      )
      .subscribe((koreanCultures: IKoreanCulture[]) => (this.koreanCulturesSharedCollection = koreanCultures));
  }
}
