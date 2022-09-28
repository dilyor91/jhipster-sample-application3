import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEvents, NewEvents } from '../events.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEvents for edit and NewEventsFormGroupInput for create.
 */
type EventsFormGroupInput = IEvents | PartialWithRequiredKeyOf<NewEvents>;

type EventsFormDefaults = Pick<NewEvents, 'id' | 'status'>;

type EventsFormGroupContent = {
  id: FormControl<IEvents['id'] | NewEvents['id']>;
  titleUz: FormControl<IEvents['titleUz']>;
  titleRu: FormControl<IEvents['titleRu']>;
  titleKr: FormControl<IEvents['titleKr']>;
  contentUz: FormControl<IEvents['contentUz']>;
  contentRu: FormControl<IEvents['contentRu']>;
  contentKr: FormControl<IEvents['contentKr']>;
  postedDate: FormControl<IEvents['postedDate']>;
  status: FormControl<IEvents['status']>;
};

export type EventsFormGroup = FormGroup<EventsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EventsFormService {
  createEventsFormGroup(events: EventsFormGroupInput = { id: null }): EventsFormGroup {
    const eventsRawValue = {
      ...this.getFormDefaults(),
      ...events,
    };
    return new FormGroup<EventsFormGroupContent>({
      id: new FormControl(
        { value: eventsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(eventsRawValue.titleUz),
      titleRu: new FormControl(eventsRawValue.titleRu),
      titleKr: new FormControl(eventsRawValue.titleKr),
      contentUz: new FormControl(eventsRawValue.contentUz),
      contentRu: new FormControl(eventsRawValue.contentRu),
      contentKr: new FormControl(eventsRawValue.contentKr),
      postedDate: new FormControl(eventsRawValue.postedDate),
      status: new FormControl(eventsRawValue.status),
    });
  }

  getEvents(form: EventsFormGroup): IEvents | NewEvents {
    return form.getRawValue() as IEvents | NewEvents;
  }

  resetForm(form: EventsFormGroup, events: EventsFormGroupInput): void {
    const eventsRawValue = { ...this.getFormDefaults(), ...events };
    form.reset(
      {
        ...eventsRawValue,
        id: { value: eventsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EventsFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}
