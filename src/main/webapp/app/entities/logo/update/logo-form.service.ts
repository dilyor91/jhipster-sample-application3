import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogo, NewLogo } from '../logo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogo for edit and NewLogoFormGroupInput for create.
 */
type LogoFormGroupInput = ILogo | PartialWithRequiredKeyOf<NewLogo>;

type LogoFormDefaults = Pick<NewLogo, 'id' | 'status'>;

type LogoFormGroupContent = {
  id: FormControl<ILogo['id'] | NewLogo['id']>;
  name: FormControl<ILogo['name']>;
  logoData: FormControl<ILogo['logoData']>;
  status: FormControl<ILogo['status']>;
};

export type LogoFormGroup = FormGroup<LogoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogoFormService {
  createLogoFormGroup(logo: LogoFormGroupInput = { id: null }): LogoFormGroup {
    const logoRawValue = {
      ...this.getFormDefaults(),
      ...logo,
    };
    return new FormGroup<LogoFormGroupContent>({
      id: new FormControl(
        { value: logoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(logoRawValue.name),
      logoData: new FormControl(logoRawValue.logoData),
      status: new FormControl(logoRawValue.status),
    });
  }

  getLogo(form: LogoFormGroup): ILogo | NewLogo {
    return form.getRawValue() as ILogo | NewLogo;
  }

  resetForm(form: LogoFormGroup, logo: LogoFormGroupInput): void {
    const logoRawValue = { ...this.getFormDefaults(), ...logo };
    form.reset(
      {
        ...logoRawValue,
        id: { value: logoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LogoFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}
