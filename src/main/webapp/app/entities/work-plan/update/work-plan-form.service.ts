import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWorkPlan, NewWorkPlan } from '../work-plan.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkPlan for edit and NewWorkPlanFormGroupInput for create.
 */
type WorkPlanFormGroupInput = IWorkPlan | PartialWithRequiredKeyOf<NewWorkPlan>;

type WorkPlanFormDefaults = Pick<NewWorkPlan, 'id'>;

type WorkPlanFormGroupContent = {
  id: FormControl<IWorkPlan['id'] | NewWorkPlan['id']>;
  titleUz: FormControl<IWorkPlan['titleUz']>;
  titleRu: FormControl<IWorkPlan['titleRu']>;
  titleKr: FormControl<IWorkPlan['titleKr']>;
  contentUz: FormControl<IWorkPlan['contentUz']>;
  contentRu: FormControl<IWorkPlan['contentRu']>;
  contentKr: FormControl<IWorkPlan['contentKr']>;
  planType: FormControl<IWorkPlan['planType']>;
};

export type WorkPlanFormGroup = FormGroup<WorkPlanFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkPlanFormService {
  createWorkPlanFormGroup(workPlan: WorkPlanFormGroupInput = { id: null }): WorkPlanFormGroup {
    const workPlanRawValue = {
      ...this.getFormDefaults(),
      ...workPlan,
    };
    return new FormGroup<WorkPlanFormGroupContent>({
      id: new FormControl(
        { value: workPlanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(workPlanRawValue.titleUz),
      titleRu: new FormControl(workPlanRawValue.titleRu),
      titleKr: new FormControl(workPlanRawValue.titleKr),
      contentUz: new FormControl(workPlanRawValue.contentUz),
      contentRu: new FormControl(workPlanRawValue.contentRu),
      contentKr: new FormControl(workPlanRawValue.contentKr),
      planType: new FormControl(workPlanRawValue.planType),
    });
  }

  getWorkPlan(form: WorkPlanFormGroup): IWorkPlan | NewWorkPlan {
    return form.getRawValue() as IWorkPlan | NewWorkPlan;
  }

  resetForm(form: WorkPlanFormGroup, workPlan: WorkPlanFormGroupInput): void {
    const workPlanRawValue = { ...this.getFormDefaults(), ...workPlan };
    form.reset(
      {
        ...workPlanRawValue,
        id: { value: workPlanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkPlanFormDefaults {
    return {
      id: null,
    };
  }
}
