import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkPlan } from '../work-plan.model';

@Component({
  selector: 'jhi-work-plan-detail',
  templateUrl: './work-plan-detail.component.html',
})
export class WorkPlanDetailComponent implements OnInit {
  workPlan: IWorkPlan | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workPlan }) => {
      this.workPlan = workPlan;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
