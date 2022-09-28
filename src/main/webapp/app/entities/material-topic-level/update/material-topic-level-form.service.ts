import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMaterialTopicLevel, NewMaterialTopicLevel } from '../material-topic-level.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMaterialTopicLevel for edit and NewMaterialTopicLevelFormGroupInput for create.
 */
type MaterialTopicLevelFormGroupInput = IMaterialTopicLevel | PartialWithRequiredKeyOf<NewMaterialTopicLevel>;

type MaterialTopicLevelFormDefaults = Pick<NewMaterialTopicLevel, 'id'>;

type MaterialTopicLevelFormGroupContent = {
  id: FormControl<IMaterialTopicLevel['id'] | NewMaterialTopicLevel['id']>;
  titleUz: FormControl<IMaterialTopicLevel['titleUz']>;
  titleRu: FormControl<IMaterialTopicLevel['titleRu']>;
  titleKr: FormControl<IMaterialTopicLevel['titleKr']>;
};

export type MaterialTopicLevelFormGroup = FormGroup<MaterialTopicLevelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MaterialTopicLevelFormService {
  createMaterialTopicLevelFormGroup(materialTopicLevel: MaterialTopicLevelFormGroupInput = { id: null }): MaterialTopicLevelFormGroup {
    const materialTopicLevelRawValue = {
      ...this.getFormDefaults(),
      ...materialTopicLevel,
    };
    return new FormGroup<MaterialTopicLevelFormGroupContent>({
      id: new FormControl(
        { value: materialTopicLevelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(materialTopicLevelRawValue.titleUz),
      titleRu: new FormControl(materialTopicLevelRawValue.titleRu),
      titleKr: new FormControl(materialTopicLevelRawValue.titleKr),
    });
  }

  getMaterialTopicLevel(form: MaterialTopicLevelFormGroup): IMaterialTopicLevel | NewMaterialTopicLevel {
    return form.getRawValue() as IMaterialTopicLevel | NewMaterialTopicLevel;
  }

  resetForm(form: MaterialTopicLevelFormGroup, materialTopicLevel: MaterialTopicLevelFormGroupInput): void {
    const materialTopicLevelRawValue = { ...this.getFormDefaults(), ...materialTopicLevel };
    form.reset(
      {
        ...materialTopicLevelRawValue,
        id: { value: materialTopicLevelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MaterialTopicLevelFormDefaults {
    return {
      id: null,
    };
  }
}
