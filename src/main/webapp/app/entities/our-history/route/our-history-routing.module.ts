import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OurHistoryComponent } from '../list/our-history.component';
import { OurHistoryDetailComponent } from '../detail/our-history-detail.component';
import { OurHistoryUpdateComponent } from '../update/our-history-update.component';
import { OurHistoryRoutingResolveService } from './our-history-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ourHistoryRoute: Routes = [
  {
    path: '',
    component: OurHistoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OurHistoryDetailComponent,
    resolve: {
      ourHistory: OurHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OurHistoryUpdateComponent,
    resolve: {
      ourHistory: OurHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OurHistoryUpdateComponent,
    resolve: {
      ourHistory: OurHistoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ourHistoryRoute)],
  exports: [RouterModule],
})
export class OurHistoryRoutingModule {}
