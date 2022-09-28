import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PopupFormService, PopupFormGroup } from './popup-form.service';
import { IPopup } from '../popup.model';
import { PopupService } from '../service/popup.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';

@Component({
  selector: 'jhi-popup-update',
  templateUrl: './popup-update.component.html',
})
export class PopupUpdateComponent implements OnInit {
  isSaving = false;
  popup: IPopup | null = null;

  attachmentsSharedCollection: IAttachment[] = [];

  editForm: PopupFormGroup = this.popupFormService.createPopupFormGroup();

  constructor(
    protected popupService: PopupService,
    protected popupFormService: PopupFormService,
    protected attachmentService: AttachmentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ popup }) => {
      this.popup = popup;
      if (popup) {
        this.updateForm(popup);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const popup = this.popupFormService.getPopup(this.editForm);
    if (popup.id !== null) {
      this.subscribeToSaveResponse(this.popupService.update(popup));
    } else {
      this.subscribeToSaveResponse(this.popupService.create(popup));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPopup>>): void {
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

  protected updateForm(popup: IPopup): void {
    this.popup = popup;
    this.popupFormService.resetForm(this.editForm, popup);

    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      popup.attachment
    );
  }

  protected loadRelationshipsOptions(): void {
    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.popup?.attachment)
        )
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));
  }
}
