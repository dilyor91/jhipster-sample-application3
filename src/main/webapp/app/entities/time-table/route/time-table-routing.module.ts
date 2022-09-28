import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TimeTableComponent } from '../list/time-table.component';
import { TimeTableDetailComponent } from '../detail/time-table-detail.component';
import { TimeTableUpdateComponent } from '../update/time-table-update.component';
import { TimeTableRoutingResolveService } from './time-table-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const timeTableRoute: Routes = [
  {
    path: '',
    component: TimeTableComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TimeTableDetailComponent,
    resolve: {
      timeTable: TimeTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TimeTableUpdateComponent,
    resolve: {
      timeTable: TimeTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TimeTableUpdateComponent,
    resolve: {
      timeTable: TimeTableRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(timeTableRoute)],
  exports: [RouterModule],
})
export class TimeTableRoutingModule {}
