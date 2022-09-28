import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITimeTable, NewTimeTable } from '../time-table.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITimeTable for edit and NewTimeTableFormGroupInput for create.
 */
type TimeTableFormGroupInput = ITimeTable | PartialWithRequiredKeyOf<NewTimeTable>;

type TimeTableFormDefaults = Pick<NewTimeTable, 'id'>;

type TimeTableFormGroupContent = {
  id: FormControl<ITimeTable['id'] | NewTimeTable['id']>;
  titleUz: FormControl<ITimeTable['titleUz']>;
  titleRu: FormControl<ITimeTable['titleRu']>;
  titleKr: FormControl<ITimeTable['titleKr']>;
  contentUz: FormControl<ITimeTable['contentUz']>;
  contentRu: FormControl<ITimeTable['contentRu']>;
  contentKr: FormControl<ITimeTable['contentKr']>;
  postedDate: FormControl<ITimeTable['postedDate']>;
};

export type TimeTableFormGroup = FormGroup<TimeTableFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TimeTableFormService {
  createTimeTableFormGroup(timeTable: TimeTableFormGroupInput = { id: null }): TimeTableFormGroup {
    const timeTableRawValue = {
      ...this.getFormDefaults(),
      ...timeTable,
    };
    return new FormGroup<TimeTableFormGroupContent>({
      id: new FormControl(
        { value: timeTableRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(timeTableRawValue.titleUz),
      titleRu: new FormControl(timeTableRawValue.titleRu),
      titleKr: new FormControl(timeTableRawValue.titleKr),
      contentUz: new FormControl(timeTableRawValue.contentUz),
      contentRu: new FormControl(timeTableRawValue.contentRu),
      contentKr: new FormControl(timeTableRawValue.contentKr),
      postedDate: new FormControl(timeTableRawValue.postedDate),
    });
  }

  getTimeTable(form: TimeTableFormGroup): ITimeTable | NewTimeTable {
    return form.getRawValue() as ITimeTable | NewTimeTable;
  }

  resetForm(form: TimeTableFormGroup, timeTable: TimeTableFormGroupInput): void {
    const timeTableRawValue = { ...this.getFormDefaults(), ...timeTable };
    form.reset(
      {
        ...timeTableRawValue,
        id: { value: timeTableRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TimeTableFormDefaults {
    return {
      id: null,
    };
  }
}
