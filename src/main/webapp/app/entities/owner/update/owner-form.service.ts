import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOwner, NewOwner } from '../owner.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOwner for edit and NewOwnerFormGroupInput for create.
 */
type OwnerFormGroupInput = IOwner | PartialWithRequiredKeyOf<NewOwner>;

type OwnerFormDefaults = Pick<NewOwner, 'id'>;

type OwnerFormGroupContent = {
  id: FormControl<IOwner['id'] | NewOwner['id']>;
  name: FormControl<IOwner['name']>;
  family: FormControl<IOwner['family']>;
};

export type OwnerFormGroup = FormGroup<OwnerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OwnerFormService {
  createOwnerFormGroup(owner: OwnerFormGroupInput = { id: null }): OwnerFormGroup {
    const ownerRawValue = {
      ...this.getFormDefaults(),
      ...owner,
    };
    return new FormGroup<OwnerFormGroupContent>({
      id: new FormControl(
        { value: ownerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(ownerRawValue.name),
      family: new FormControl(ownerRawValue.family),
    });
  }

  getOwner(form: OwnerFormGroup): IOwner | NewOwner {
    return form.getRawValue() as IOwner | NewOwner;
  }

  resetForm(form: OwnerFormGroup, owner: OwnerFormGroupInput): void {
    const ownerRawValue = { ...this.getFormDefaults(), ...owner };
    form.reset(
      {
        ...ownerRawValue,
        id: { value: ownerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OwnerFormDefaults {
    return {
      id: null,
    };
  }
}
