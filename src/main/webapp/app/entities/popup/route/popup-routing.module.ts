import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PopupComponent } from '../list/popup.component';
import { PopupDetailComponent } from '../detail/popup-detail.component';
import { PopupUpdateComponent } from '../update/popup-update.component';
import { PopupRoutingResolveService } from './popup-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const popupRoute: Routes = [
  {
    path: '',
    component: PopupComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PopupDetailComponent,
    resolve: {
      popup: PopupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PopupUpdateComponent,
    resolve: {
      popup: PopupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PopupUpdateComponent,
    resolve: {
      popup: PopupRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(popupRoute)],
  exports: [RouterModule],
})
export class PopupRoutingModule {}
