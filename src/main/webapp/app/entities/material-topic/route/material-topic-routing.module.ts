import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaterialTopicComponent } from '../list/material-topic.component';
import { MaterialTopicDetailComponent } from '../detail/material-topic-detail.component';
import { MaterialTopicUpdateComponent } from '../update/material-topic-update.component';
import { MaterialTopicRoutingResolveService } from './material-topic-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const materialTopicRoute: Routes = [
  {
    path: '',
    component: MaterialTopicComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialTopicDetailComponent,
    resolve: {
      materialTopic: MaterialTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialTopicUpdateComponent,
    resolve: {
      materialTopic: MaterialTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialTopicUpdateComponent,
    resolve: {
      materialTopic: MaterialTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialTopicRoute)],
  exports: [RouterModule],
})
export class MaterialTopicRoutingModule {}
