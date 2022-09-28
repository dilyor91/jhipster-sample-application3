import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFileTopic, NewFileTopic } from '../file-topic.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFileTopic for edit and NewFileTopicFormGroupInput for create.
 */
type FileTopicFormGroupInput = IFileTopic | PartialWithRequiredKeyOf<NewFileTopic>;

type FileTopicFormDefaults = Pick<NewFileTopic, 'id'>;

type FileTopicFormGroupContent = {
  id: FormControl<IFileTopic['id'] | NewFileTopic['id']>;
  fileOrginalName: FormControl<IFileTopic['fileOrginalName']>;
  fileNameUz: FormControl<IFileTopic['fileNameUz']>;
  fileNameRu: FormControl<IFileTopic['fileNameRu']>;
  fileNameKr: FormControl<IFileTopic['fileNameKr']>;
  fileType: FormControl<IFileTopic['fileType']>;
  fileSize: FormControl<IFileTopic['fileSize']>;
  filePath: FormControl<IFileTopic['filePath']>;
  materialTopicLevel: FormControl<IFileTopic['materialTopicLevel']>;
};

export type FileTopicFormGroup = FormGroup<FileTopicFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FileTopicFormService {
  createFileTopicFormGroup(fileTopic: FileTopicFormGroupInput = { id: null }): FileTopicFormGroup {
    const fileTopicRawValue = {
      ...this.getFormDefaults(),
      ...fileTopic,
    };
    return new FormGroup<FileTopicFormGroupContent>({
      id: new FormControl(
        { value: fileTopicRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fileOrginalName: new FormControl(fileTopicRawValue.fileOrginalName),
      fileNameUz: new FormControl(fileTopicRawValue.fileNameUz),
      fileNameRu: new FormControl(fileTopicRawValue.fileNameRu),
      fileNameKr: new FormControl(fileTopicRawValue.fileNameKr),
      fileType: new FormControl(fileTopicRawValue.fileType),
      fileSize: new FormControl(fileTopicRawValue.fileSize),
      filePath: new FormControl(fileTopicRawValue.filePath),
      materialTopicLevel: new FormControl(fileTopicRawValue.materialTopicLevel),
    });
  }

  getFileTopic(form: FileTopicFormGroup): IFileTopic | NewFileTopic {
    return form.getRawValue() as IFileTopic | NewFileTopic;
  }

  resetForm(form: FileTopicFormGroup, fileTopic: FileTopicFormGroupInput): void {
    const fileTopicRawValue = { ...this.getFormDefaults(), ...fileTopic };
    form.reset(
      {
        ...fileTopicRawValue,
        id: { value: fileTopicRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FileTopicFormDefaults {
    return {
      id: null,
    };
  }
}
