import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGreeting, NewGreeting } from '../greeting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGreeting for edit and NewGreetingFormGroupInput for create.
 */
type GreetingFormGroupInput = IGreeting | PartialWithRequiredKeyOf<NewGreeting>;

type GreetingFormDefaults = Pick<NewGreeting, 'id'>;

type GreetingFormGroupContent = {
  id: FormControl<IGreeting['id'] | NewGreeting['id']>;
  contentUz: FormControl<IGreeting['contentUz']>;
  contentRu: FormControl<IGreeting['contentRu']>;
  contentKr: FormControl<IGreeting['contentKr']>;
};

export type GreetingFormGroup = FormGroup<GreetingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GreetingFormService {
  createGreetingFormGroup(greeting: GreetingFormGroupInput = { id: null }): GreetingFormGroup {
    const greetingRawValue = {
      ...this.getFormDefaults(),
      ...greeting,
    };
    return new FormGroup<GreetingFormGroupContent>({
      id: new FormControl(
        { value: greetingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contentUz: new FormControl(greetingRawValue.contentUz),
      contentRu: new FormControl(greetingRawValue.contentRu),
      contentKr: new FormControl(greetingRawValue.contentKr),
    });
  }

  getGreeting(form: GreetingFormGroup): IGreeting | NewGreeting {
    return form.getRawValue() as IGreeting | NewGreeting;
  }

  resetForm(form: GreetingFormGroup, greeting: GreetingFormGroupInput): void {
    const greetingRawValue = { ...this.getFormDefaults(), ...greeting };
    form.reset(
      {
        ...greetingRawValue,
        id: { value: greetingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GreetingFormDefaults {
    return {
      id: null,
    };
  }
}
