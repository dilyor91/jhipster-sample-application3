import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IKoreanCulture, NewKoreanCulture } from '../korean-culture.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKoreanCulture for edit and NewKoreanCultureFormGroupInput for create.
 */
type KoreanCultureFormGroupInput = IKoreanCulture | PartialWithRequiredKeyOf<NewKoreanCulture>;

type KoreanCultureFormDefaults = Pick<NewKoreanCulture, 'id'>;

type KoreanCultureFormGroupContent = {
  id: FormControl<IKoreanCulture['id'] | NewKoreanCulture['id']>;
  titleUz: FormControl<IKoreanCulture['titleUz']>;
  titleRu: FormControl<IKoreanCulture['titleRu']>;
  titleKr: FormControl<IKoreanCulture['titleKr']>;
  contentUz: FormControl<IKoreanCulture['contentUz']>;
  contentRu: FormControl<IKoreanCulture['contentRu']>;
  contentKr: FormControl<IKoreanCulture['contentKr']>;
};

export type KoreanCultureFormGroup = FormGroup<KoreanCultureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KoreanCultureFormService {
  createKoreanCultureFormGroup(koreanCulture: KoreanCultureFormGroupInput = { id: null }): KoreanCultureFormGroup {
    const koreanCultureRawValue = {
      ...this.getFormDefaults(),
      ...koreanCulture,
    };
    return new FormGroup<KoreanCultureFormGroupContent>({
      id: new FormControl(
        { value: koreanCultureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(koreanCultureRawValue.titleUz, {
        validators: [Validators.maxLength(1024)],
      }),
      titleRu: new FormControl(koreanCultureRawValue.titleRu, {
        validators: [Validators.maxLength(1024)],
      }),
      titleKr: new FormControl(koreanCultureRawValue.titleKr, {
        validators: [Validators.maxLength(1024)],
      }),
      contentUz: new FormControl(koreanCultureRawValue.contentUz, {
        validators: [Validators.maxLength(4000)],
      }),
      contentRu: new FormControl(koreanCultureRawValue.contentRu, {
        validators: [Validators.maxLength(4000)],
      }),
      contentKr: new FormControl(koreanCultureRawValue.contentKr, {
        validators: [Validators.maxLength(4000)],
      }),
    });
  }

  getKoreanCulture(form: KoreanCultureFormGroup): IKoreanCulture | NewKoreanCulture {
    return form.getRawValue() as IKoreanCulture | NewKoreanCulture;
  }

  resetForm(form: KoreanCultureFormGroup, koreanCulture: KoreanCultureFormGroupInput): void {
    const koreanCultureRawValue = { ...this.getFormDefaults(), ...koreanCulture };
    form.reset(
      {
        ...koreanCultureRawValue,
        id: { value: koreanCultureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): KoreanCultureFormDefaults {
    return {
      id: null,
    };
  }
}
