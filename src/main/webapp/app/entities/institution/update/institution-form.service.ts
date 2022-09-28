import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstitution, NewInstitution } from '../institution.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitution for edit and NewInstitutionFormGroupInput for create.
 */
type InstitutionFormGroupInput = IInstitution | PartialWithRequiredKeyOf<NewInstitution>;

type InstitutionFormDefaults = Pick<NewInstitution, 'id'>;

type InstitutionFormGroupContent = {
  id: FormControl<IInstitution['id'] | NewInstitution['id']>;
  institutionType: FormControl<IInstitution['institutionType']>;
  titleUz: FormControl<IInstitution['titleUz']>;
  titleRu: FormControl<IInstitution['titleRu']>;
  titleKr: FormControl<IInstitution['titleKr']>;
  contentUz: FormControl<IInstitution['contentUz']>;
  contentRu: FormControl<IInstitution['contentRu']>;
  contentKr: FormControl<IInstitution['contentKr']>;
  logoName: FormControl<IInstitution['logoName']>;
  logoData: FormControl<IInstitution['logoData']>;
};

export type InstitutionFormGroup = FormGroup<InstitutionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionFormService {
  createInstitutionFormGroup(institution: InstitutionFormGroupInput = { id: null }): InstitutionFormGroup {
    const institutionRawValue = {
      ...this.getFormDefaults(),
      ...institution,
    };
    return new FormGroup<InstitutionFormGroupContent>({
      id: new FormControl(
        { value: institutionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institutionType: new FormControl(institutionRawValue.institutionType),
      titleUz: new FormControl(institutionRawValue.titleUz),
      titleRu: new FormControl(institutionRawValue.titleRu),
      titleKr: new FormControl(institutionRawValue.titleKr),
      contentUz: new FormControl(institutionRawValue.contentUz),
      contentRu: new FormControl(institutionRawValue.contentRu),
      contentKr: new FormControl(institutionRawValue.contentKr),
      logoName: new FormControl(institutionRawValue.logoName),
      logoData: new FormControl(institutionRawValue.logoData),
    });
  }

  getInstitution(form: InstitutionFormGroup): IInstitution | NewInstitution {
    return form.getRawValue() as IInstitution | NewInstitution;
  }

  resetForm(form: InstitutionFormGroup, institution: InstitutionFormGroupInput): void {
    const institutionRawValue = { ...this.getFormDefaults(), ...institution };
    form.reset(
      {
        ...institutionRawValue,
        id: { value: institutionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionFormDefaults {
    return {
      id: null,
    };
  }
}
