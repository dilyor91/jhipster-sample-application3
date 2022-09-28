import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaterialTopicLevelComponent } from '../list/material-topic-level.component';
import { MaterialTopicLevelDetailComponent } from '../detail/material-topic-level-detail.component';
import { MaterialTopicLevelUpdateComponent } from '../update/material-topic-level-update.component';
import { MaterialTopicLevelRoutingResolveService } from './material-topic-level-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const materialTopicLevelRoute: Routes = [
  {
    path: '',
    component: MaterialTopicLevelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialTopicLevelDetailComponent,
    resolve: {
      materialTopicLevel: MaterialTopicLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialTopicLevelUpdateComponent,
    resolve: {
      materialTopicLevel: MaterialTopicLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialTopicLevelUpdateComponent,
    resolve: {
      materialTopicLevel: MaterialTopicLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialTopicLevelRoute)],
  exports: [RouterModule],
})
export class MaterialTopicLevelRoutingModule {}
