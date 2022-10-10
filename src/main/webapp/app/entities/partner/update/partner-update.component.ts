import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PartnerFormService, PartnerFormGroup } from './partner-form.service';
import { IPartner } from '../partner.model';
import { PartnerService } from '../service/partner.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';

@Component({
  selector: 'jhi-partner-update',
  templateUrl: './partner-update.component.html',
})
export class PartnerUpdateComponent implements OnInit {
  isSaving = false;
  partner: IPartner | null = null;

  attachmentsSharedCollection: IAttachment[] = [];

  editForm: PartnerFormGroup = this.partnerFormService.createPartnerFormGroup();

  constructor(
    protected partnerService: PartnerService,
    protected partnerFormService: PartnerFormService,
    protected attachmentService: AttachmentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partner }) => {
      this.partner = partner;
      if (partner) {
        this.updateForm(partner);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const partner = this.partnerFormService.getPartner(this.editForm);
    if (partner.id !== null) {
      this.subscribeToSaveResponse(this.partnerService.update(partner));
    } else {
      this.subscribeToSaveResponse(this.partnerService.create(partner));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartner>>): void {
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

  protected updateForm(partner: IPartner): void {
    this.partner = partner;
    this.partnerFormService.resetForm(this.editForm, partner);

    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      partner.attachment
    );
  }

  protected loadRelationshipsOptions(): void {
    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.partner?.attachment)
        )
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));
  }
}
