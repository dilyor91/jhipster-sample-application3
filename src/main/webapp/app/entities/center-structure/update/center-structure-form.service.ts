import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICenterStructure, NewCenterStructure } from '../center-structure.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICenterStructure for edit and NewCenterStructureFormGroupInput for create.
 */
type CenterStructureFormGroupInput = ICenterStructure | PartialWithRequiredKeyOf<NewCenterStructure>;

type CenterStructureFormDefaults = Pick<NewCenterStructure, 'id'>;

type CenterStructureFormGroupContent = {
  id: FormControl<ICenterStructure['id'] | NewCenterStructure['id']>;
  contentUz: FormControl<ICenterStructure['contentUz']>;
  contentRu: FormControl<ICenterStructure['contentRu']>;
  contentKr: FormControl<ICenterStructure['contentKr']>;
};

export type CenterStructureFormGroup = FormGroup<CenterStructureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CenterStructureFormService {
  createCenterStructureFormGroup(centerStructure: CenterStructureFormGroupInput = { id: null }): CenterStructureFormGroup {
    const centerStructureRawValue = {
      ...this.getFormDefaults(),
      ...centerStructure,
    };
    return new FormGroup<CenterStructureFormGroupContent>({
      id: new FormControl(
        { value: centerStructureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contentUz: new FormControl(centerStructureRawValue.contentUz),
      contentRu: new FormControl(centerStructureRawValue.contentRu),
      contentKr: new FormControl(centerStructureRawValue.contentKr),
    });
  }

  getCenterStructure(form: CenterStructureFormGroup): ICenterStructure | NewCenterStructure {
    return form.getRawValue() as ICenterStructure | NewCenterStructure;
  }

  resetForm(form: CenterStructureFormGroup, centerStructure: CenterStructureFormGroupInput): void {
    const centerStructureRawValue = { ...this.getFormDefaults(), ...centerStructure };
    form.reset(
      {
        ...centerStructureRawValue,
        id: { value: centerStructureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CenterStructureFormDefaults {
    return {
      id: null,
    };
  }
}
