import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBanner, NewBanner } from '../banner.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBanner for edit and NewBannerFormGroupInput for create.
 */
type BannerFormGroupInput = IBanner | PartialWithRequiredKeyOf<NewBanner>;

type BannerFormDefaults = Pick<NewBanner, 'id' | 'status'>;

type BannerFormGroupContent = {
  id: FormControl<IBanner['id'] | NewBanner['id']>;
  name: FormControl<IBanner['name']>;
  bannerData: FormControl<IBanner['bannerData']>;
  status: FormControl<IBanner['status']>;
};

export type BannerFormGroup = FormGroup<BannerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BannerFormService {
  createBannerFormGroup(banner: BannerFormGroupInput = { id: null }): BannerFormGroup {
    const bannerRawValue = {
      ...this.getFormDefaults(),
      ...banner,
    };
    return new FormGroup<BannerFormGroupContent>({
      id: new FormControl(
        { value: bannerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(bannerRawValue.name),
      bannerData: new FormControl(bannerRawValue.bannerData),
      status: new FormControl(bannerRawValue.status),
    });
  }

  getBanner(form: BannerFormGroup): IBanner | NewBanner {
    return form.getRawValue() as IBanner | NewBanner;
  }

  resetForm(form: BannerFormGroup, banner: BannerFormGroupInput): void {
    const bannerRawValue = { ...this.getFormDefaults(), ...banner };
    form.reset(
      {
        ...bannerRawValue,
        id: { value: bannerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BannerFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}
