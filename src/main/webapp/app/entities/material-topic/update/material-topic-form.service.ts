import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMaterialTopic, NewMaterialTopic } from '../material-topic.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMaterialTopic for edit and NewMaterialTopicFormGroupInput for create.
 */
type MaterialTopicFormGroupInput = IMaterialTopic | PartialWithRequiredKeyOf<NewMaterialTopic>;

type MaterialTopicFormDefaults = Pick<NewMaterialTopic, 'id'>;

type MaterialTopicFormGroupContent = {
  id: FormControl<IMaterialTopic['id'] | NewMaterialTopic['id']>;
  titleUz: FormControl<IMaterialTopic['titleUz']>;
  titleRu: FormControl<IMaterialTopic['titleRu']>;
  titleKr: FormControl<IMaterialTopic['titleKr']>;
  materialTopicLevel: FormControl<IMaterialTopic['materialTopicLevel']>;
};

export type MaterialTopicFormGroup = FormGroup<MaterialTopicFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MaterialTopicFormService {
  createMaterialTopicFormGroup(materialTopic: MaterialTopicFormGroupInput = { id: null }): MaterialTopicFormGroup {
    const materialTopicRawValue = {
      ...this.getFormDefaults(),
      ...materialTopic,
    };
    return new FormGroup<MaterialTopicFormGroupContent>({
      id: new FormControl(
        { value: materialTopicRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(materialTopicRawValue.titleUz),
      titleRu: new FormControl(materialTopicRawValue.titleRu),
      titleKr: new FormControl(materialTopicRawValue.titleKr),
      materialTopicLevel: new FormControl(materialTopicRawValue.materialTopicLevel),
    });
  }

  getMaterialTopic(form: MaterialTopicFormGroup): IMaterialTopic | NewMaterialTopic {
    return form.getRawValue() as IMaterialTopic | NewMaterialTopic;
  }

  resetForm(form: MaterialTopicFormGroup, materialTopic: MaterialTopicFormGroupInput): void {
    const materialTopicRawValue = { ...this.getFormDefaults(), ...materialTopic };
    form.reset(
      {
        ...materialTopicRawValue,
        id: { value: materialTopicRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MaterialTopicFormDefaults {
    return {
      id: null,
    };
  }
}
