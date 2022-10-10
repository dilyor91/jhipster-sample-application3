import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPartner, NewPartner } from '../partner.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPartner for edit and NewPartnerFormGroupInput for create.
 */
type PartnerFormGroupInput = IPartner | PartialWithRequiredKeyOf<NewPartner>;

type PartnerFormDefaults = Pick<NewPartner, 'id'>;

type PartnerFormGroupContent = {
  id: FormControl<IPartner['id'] | NewPartner['id']>;
  titleUz: FormControl<IPartner['titleUz']>;
  titleRu: FormControl<IPartner['titleRu']>;
  titleKr: FormControl<IPartner['titleKr']>;
  webUrl: FormControl<IPartner['webUrl']>;
  youtubeUrl: FormControl<IPartner['youtubeUrl']>;
  attachment: FormControl<IPartner['attachment']>;
};

export type PartnerFormGroup = FormGroup<PartnerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PartnerFormService {
  createPartnerFormGroup(partner: PartnerFormGroupInput = { id: null }): PartnerFormGroup {
    const partnerRawValue = {
      ...this.getFormDefaults(),
      ...partner,
    };
    return new FormGroup<PartnerFormGroupContent>({
      id: new FormControl(
        { value: partnerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(partnerRawValue.titleUz, {
        validators: [Validators.maxLength(1024)],
      }),
      titleRu: new FormControl(partnerRawValue.titleRu, {
        validators: [Validators.maxLength(1024)],
      }),
      titleKr: new FormControl(partnerRawValue.titleKr, {
        validators: [Validators.maxLength(1024)],
      }),
      webUrl: new FormControl(partnerRawValue.webUrl, {
        validators: [Validators.maxLength(1024)],
      }),
      youtubeUrl: new FormControl(partnerRawValue.youtubeUrl, {
        validators: [Validators.maxLength(256)],
      }),
      attachment: new FormControl(partnerRawValue.attachment),
    });
  }

  getPartner(form: PartnerFormGroup): IPartner | NewPartner {
    return form.getRawValue() as IPartner | NewPartner;
  }

  resetForm(form: PartnerFormGroup, partner: PartnerFormGroupInput): void {
    const partnerRawValue = { ...this.getFormDefaults(), ...partner };
    form.reset(
      {
        ...partnerRawValue,
        id: { value: partnerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PartnerFormDefaults {
    return {
      id: null,
    };
  }
}
