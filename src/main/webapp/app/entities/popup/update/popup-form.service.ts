import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPopup, NewPopup } from '../popup.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPopup for edit and NewPopupFormGroupInput for create.
 */
type PopupFormGroupInput = IPopup | PartialWithRequiredKeyOf<NewPopup>;

type PopupFormDefaults = Pick<NewPopup, 'id' | 'isImage'>;

type PopupFormGroupContent = {
  id: FormControl<IPopup['id'] | NewPopup['id']>;
  isImage: FormControl<IPopup['isImage']>;
  videoUrl: FormControl<IPopup['videoUrl']>;
  redirectUrl: FormControl<IPopup['redirectUrl']>;
  attachment: FormControl<IPopup['attachment']>;
};

export type PopupFormGroup = FormGroup<PopupFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PopupFormService {
  createPopupFormGroup(popup: PopupFormGroupInput = { id: null }): PopupFormGroup {
    const popupRawValue = {
      ...this.getFormDefaults(),
      ...popup,
    };
    return new FormGroup<PopupFormGroupContent>({
      id: new FormControl(
        { value: popupRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      isImage: new FormControl(popupRawValue.isImage),
      videoUrl: new FormControl(popupRawValue.videoUrl),
      redirectUrl: new FormControl(popupRawValue.redirectUrl),
      attachment: new FormControl(popupRawValue.attachment),
    });
  }

  getPopup(form: PopupFormGroup): IPopup | NewPopup {
    return form.getRawValue() as IPopup | NewPopup;
  }

  resetForm(form: PopupFormGroup, popup: PopupFormGroupInput): void {
    const popupRawValue = { ...this.getFormDefaults(), ...popup };
    form.reset(
      {
        ...popupRawValue,
        id: { value: popupRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PopupFormDefaults {
    return {
      id: null,
      isImage: false,
    };
  }
}
