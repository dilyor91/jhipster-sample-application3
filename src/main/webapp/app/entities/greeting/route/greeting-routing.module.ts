import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GreetingComponent } from '../list/greeting.component';
import { GreetingDetailComponent } from '../detail/greeting-detail.component';
import { GreetingUpdateComponent } from '../update/greeting-update.component';
import { GreetingRoutingResolveService } from './greeting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const greetingRoute: Routes = [
  {
    path: '',
    component: GreetingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GreetingDetailComponent,
    resolve: {
      greeting: GreetingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GreetingUpdateComponent,
    resolve: {
      greeting: GreetingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GreetingUpdateComponent,
    resolve: {
      greeting: GreetingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(greetingRoute)],
  exports: [RouterModule],
})
export class GreetingRoutingModule {}
