import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOurHistory, NewOurHistory } from '../our-history.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOurHistory for edit and NewOurHistoryFormGroupInput for create.
 */
type OurHistoryFormGroupInput = IOurHistory | PartialWithRequiredKeyOf<NewOurHistory>;

type OurHistoryFormDefaults = Pick<NewOurHistory, 'id'>;

type OurHistoryFormGroupContent = {
  id: FormControl<IOurHistory['id'] | NewOurHistory['id']>;
  contentUz: FormControl<IOurHistory['contentUz']>;
  contentRu: FormControl<IOurHistory['contentRu']>;
  contentKr: FormControl<IOurHistory['contentKr']>;
  postedDate: FormControl<IOurHistory['postedDate']>;
};

export type OurHistoryFormGroup = FormGroup<OurHistoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OurHistoryFormService {
  createOurHistoryFormGroup(ourHistory: OurHistoryFormGroupInput = { id: null }): OurHistoryFormGroup {
    const ourHistoryRawValue = {
      ...this.getFormDefaults(),
      ...ourHistory,
    };
    return new FormGroup<OurHistoryFormGroupContent>({
      id: new FormControl(
        { value: ourHistoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contentUz: new FormControl(ourHistoryRawValue.contentUz),
      contentRu: new FormControl(ourHistoryRawValue.contentRu),
      contentKr: new FormControl(ourHistoryRawValue.contentKr),
      postedDate: new FormControl(ourHistoryRawValue.postedDate),
    });
  }

  getOurHistory(form: OurHistoryFormGroup): IOurHistory | NewOurHistory {
    return form.getRawValue() as IOurHistory | NewOurHistory;
  }

  resetForm(form: OurHistoryFormGroup, ourHistory: OurHistoryFormGroupInput): void {
    const ourHistoryRawValue = { ...this.getFormDefaults(), ...ourHistory };
    form.reset(
      {
        ...ourHistoryRawValue,
        id: { value: ourHistoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OurHistoryFormDefaults {
    return {
      id: null,
    };
  }
}
