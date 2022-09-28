import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkPlan } from '../work-plan.model';
import { WorkPlanService } from '../service/work-plan.service';

@Injectable({ providedIn: 'root' })
export class WorkPlanRoutingResolveService implements Resolve<IWorkPlan | null> {
  constructor(protected service: WorkPlanService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkPlan | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workPlan: HttpResponse<IWorkPlan>) => {
          if (workPlan.body) {
            return of(workPlan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
