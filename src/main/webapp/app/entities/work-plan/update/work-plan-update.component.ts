import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WorkPlanFormService, WorkPlanFormGroup } from './work-plan-form.service';
import { IWorkPlan } from '../work-plan.model';
import { WorkPlanService } from '../service/work-plan.service';
import { PlanType } from 'app/entities/enumerations/plan-type.model';

@Component({
  selector: 'jhi-work-plan-update',
  templateUrl: './work-plan-update.component.html',
})
export class WorkPlanUpdateComponent implements OnInit {
  isSaving = false;
  workPlan: IWorkPlan | null = null;
  planTypeValues = Object.keys(PlanType);

  editForm: WorkPlanFormGroup = this.workPlanFormService.createWorkPlanFormGroup();

  constructor(
    protected workPlanService: WorkPlanService,
    protected workPlanFormService: WorkPlanFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workPlan }) => {
      this.workPlan = workPlan;
      if (workPlan) {
        this.updateForm(workPlan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workPlan = this.workPlanFormService.getWorkPlan(this.editForm);
    if (workPlan.id !== null) {
      this.subscribeToSaveResponse(this.workPlanService.update(workPlan));
    } else {
      this.subscribeToSaveResponse(this.workPlanService.create(workPlan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkPlan>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(workPlan: IWorkPlan): void {
    this.workPlan = workPlan;
    this.workPlanFormService.resetForm(this.editForm, workPlan);
  }
}
