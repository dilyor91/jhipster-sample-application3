import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAttachment, NewAttachment } from '../attachment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAttachment for edit and NewAttachmentFormGroupInput for create.
 */
type AttachmentFormGroupInput = IAttachment | PartialWithRequiredKeyOf<NewAttachment>;

type AttachmentFormDefaults = Pick<NewAttachment, 'id'>;

type AttachmentFormGroupContent = {
  id: FormControl<IAttachment['id'] | NewAttachment['id']>;
  fileNameUz: FormControl<IAttachment['fileNameUz']>;
  fileNameRu: FormControl<IAttachment['fileNameRu']>;
  fileNameKr: FormControl<IAttachment['fileNameKr']>;
  path: FormControl<IAttachment['path']>;
  originalFileName: FormControl<IAttachment['originalFileName']>;
  contentType: FormControl<IAttachment['contentType']>;
  fileSize: FormControl<IAttachment['fileSize']>;
  suffix: FormControl<IAttachment['suffix']>;
  thumbnailFileName: FormControl<IAttachment['thumbnailFileName']>;
  bucketName: FormControl<IAttachment['bucketName']>;
  koreanCulture: FormControl<IAttachment['koreanCulture']>;
};

export type AttachmentFormGroup = FormGroup<AttachmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AttachmentFormService {
  createAttachmentFormGroup(attachment: AttachmentFormGroupInput = { id: null }): AttachmentFormGroup {
    const attachmentRawValue = {
      ...this.getFormDefaults(),
      ...attachment,
    };
    return new FormGroup<AttachmentFormGroupContent>({
      id: new FormControl(
        { value: attachmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fileNameUz: new FormControl(attachmentRawValue.fileNameUz),
      fileNameRu: new FormControl(attachmentRawValue.fileNameRu),
      fileNameKr: new FormControl(attachmentRawValue.fileNameKr),
      path: new FormControl(attachmentRawValue.path),
      originalFileName: new FormControl(attachmentRawValue.originalFileName),
      contentType: new FormControl(attachmentRawValue.contentType),
      fileSize: new FormControl(attachmentRawValue.fileSize),
      suffix: new FormControl(attachmentRawValue.suffix, {
        validators: [Validators.maxLength(8)],
      }),
      thumbnailFileName: new FormControl(attachmentRawValue.thumbnailFileName),
      bucketName: new FormControl(attachmentRawValue.bucketName),
      koreanCulture: new FormControl(attachmentRawValue.koreanCulture),
    });
  }

  getAttachment(form: AttachmentFormGroup): IAttachment | NewAttachment {
    return form.getRawValue() as IAttachment | NewAttachment;
  }

  resetForm(form: AttachmentFormGroup, attachment: AttachmentFormGroupInput): void {
    const attachmentRawValue = { ...this.getFormDefaults(), ...attachment };
    form.reset(
      {
        ...attachmentRawValue,
        id: { value: attachmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AttachmentFormDefaults {
    return {
      id: null,
    };
  }
}
