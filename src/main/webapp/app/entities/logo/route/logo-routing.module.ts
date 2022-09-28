import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LogoComponent } from '../list/logo.component';
import { LogoDetailComponent } from '../detail/logo-detail.component';
import { LogoUpdateComponent } from '../update/logo-update.component';
import { LogoRoutingResolveService } from './logo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const logoRoute: Routes = [
  {
    path: '',
    component: LogoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogoDetailComponent,
    resolve: {
      logo: LogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogoUpdateComponent,
    resolve: {
      logo: LogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogoUpdateComponent,
    resolve: {
      logo: LogoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(logoRoute)],
  exports: [RouterModule],
})
export class LogoRoutingModule {}
