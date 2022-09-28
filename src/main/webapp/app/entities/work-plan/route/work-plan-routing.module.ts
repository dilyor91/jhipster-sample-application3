import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WorkPlanComponent } from '../list/work-plan.component';
import { WorkPlanDetailComponent } from '../detail/work-plan-detail.component';
import { WorkPlanUpdateComponent } from '../update/work-plan-update.component';
import { WorkPlanRoutingResolveService } from './work-plan-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const workPlanRoute: Routes = [
  {
    path: '',
    component: WorkPlanComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkPlanDetailComponent,
    resolve: {
      workPlan: WorkPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkPlanUpdateComponent,
    resolve: {
      workPlan: WorkPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkPlanUpdateComponent,
    resolve: {
      workPlan: WorkPlanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workPlanRoute)],
  exports: [RouterModule],
})
export class WorkPlanRoutingModule {}
