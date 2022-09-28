import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FileTopicComponent } from '../list/file-topic.component';
import { FileTopicDetailComponent } from '../detail/file-topic-detail.component';
import { FileTopicUpdateComponent } from '../update/file-topic-update.component';
import { FileTopicRoutingResolveService } from './file-topic-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fileTopicRoute: Routes = [
  {
    path: '',
    component: FileTopicComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FileTopicDetailComponent,
    resolve: {
      fileTopic: FileTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FileTopicUpdateComponent,
    resolve: {
      fileTopic: FileTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FileTopicUpdateComponent,
    resolve: {
      fileTopic: FileTopicRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fileTopicRoute)],
  exports: [RouterModule],
})
export class FileTopicRoutingModule {}
