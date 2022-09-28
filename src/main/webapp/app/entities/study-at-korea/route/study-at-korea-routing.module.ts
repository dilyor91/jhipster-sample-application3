import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StudyAtKoreaComponent } from '../list/study-at-korea.component';
import { StudyAtKoreaDetailComponent } from '../detail/study-at-korea-detail.component';
import { StudyAtKoreaUpdateComponent } from '../update/study-at-korea-update.component';
import { StudyAtKoreaRoutingResolveService } from './study-at-korea-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const studyAtKoreaRoute: Routes = [
  {
    path: '',
    component: StudyAtKoreaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudyAtKoreaDetailComponent,
    resolve: {
      studyAtKorea: StudyAtKoreaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudyAtKoreaUpdateComponent,
    resolve: {
      studyAtKorea: StudyAtKoreaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudyAtKoreaUpdateComponent,
    resolve: {
      studyAtKorea: StudyAtKoreaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(studyAtKoreaRoute)],
  exports: [RouterModule],
})
export class StudyAtKoreaRoutingModule {}
