import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudyAtKorea, NewStudyAtKorea } from '../study-at-korea.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudyAtKorea for edit and NewStudyAtKoreaFormGroupInput for create.
 */
type StudyAtKoreaFormGroupInput = IStudyAtKorea | PartialWithRequiredKeyOf<NewStudyAtKorea>;

type StudyAtKoreaFormDefaults = Pick<NewStudyAtKorea, 'id'>;

type StudyAtKoreaFormGroupContent = {
  id: FormControl<IStudyAtKorea['id'] | NewStudyAtKorea['id']>;
  titleUz: FormControl<IStudyAtKorea['titleUz']>;
  titleRu: FormControl<IStudyAtKorea['titleRu']>;
  titleKr: FormControl<IStudyAtKorea['titleKr']>;
  contentUz: FormControl<IStudyAtKorea['contentUz']>;
  contentRu: FormControl<IStudyAtKorea['contentRu']>;
  contentKr: FormControl<IStudyAtKorea['contentKr']>;
};

export type StudyAtKoreaFormGroup = FormGroup<StudyAtKoreaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudyAtKoreaFormService {
  createStudyAtKoreaFormGroup(studyAtKorea: StudyAtKoreaFormGroupInput = { id: null }): StudyAtKoreaFormGroup {
    const studyAtKoreaRawValue = {
      ...this.getFormDefaults(),
      ...studyAtKorea,
    };
    return new FormGroup<StudyAtKoreaFormGroupContent>({
      id: new FormControl(
        { value: studyAtKoreaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(studyAtKoreaRawValue.titleUz),
      titleRu: new FormControl(studyAtKoreaRawValue.titleRu),
      titleKr: new FormControl(studyAtKoreaRawValue.titleKr),
      contentUz: new FormControl(studyAtKoreaRawValue.contentUz),
      contentRu: new FormControl(studyAtKoreaRawValue.contentRu),
      contentKr: new FormControl(studyAtKoreaRawValue.contentKr),
    });
  }

  getStudyAtKorea(form: StudyAtKoreaFormGroup): IStudyAtKorea | NewStudyAtKorea {
    return form.getRawValue() as IStudyAtKorea | NewStudyAtKorea;
  }

  resetForm(form: StudyAtKoreaFormGroup, studyAtKorea: StudyAtKoreaFormGroupInput): void {
    const studyAtKoreaRawValue = { ...this.getFormDefaults(), ...studyAtKorea };
    form.reset(
      {
        ...studyAtKoreaRawValue,
        id: { value: studyAtKoreaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StudyAtKoreaFormDefaults {
    return {
      id: null,
    };
  }
}
