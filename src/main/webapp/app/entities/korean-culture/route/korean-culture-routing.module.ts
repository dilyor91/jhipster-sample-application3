import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { KoreanCultureComponent } from '../list/korean-culture.component';
import { KoreanCultureDetailComponent } from '../detail/korean-culture-detail.component';
import { KoreanCultureUpdateComponent } from '../update/korean-culture-update.component';
import { KoreanCultureRoutingResolveService } from './korean-culture-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const koreanCultureRoute: Routes = [
  {
    path: '',
    component: KoreanCultureComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KoreanCultureDetailComponent,
    resolve: {
      koreanCulture: KoreanCultureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KoreanCultureUpdateComponent,
    resolve: {
      koreanCulture: KoreanCultureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KoreanCultureUpdateComponent,
    resolve: {
      koreanCulture: KoreanCultureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(koreanCultureRoute)],
  exports: [RouterModule],
})
export class KoreanCultureRoutingModule {}
