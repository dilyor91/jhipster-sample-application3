import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CenterStructureComponent } from '../list/center-structure.component';
import { CenterStructureDetailComponent } from '../detail/center-structure-detail.component';
import { CenterStructureUpdateComponent } from '../update/center-structure-update.component';
import { CenterStructureRoutingResolveService } from './center-structure-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const centerStructureRoute: Routes = [
  {
    path: '',
    component: CenterStructureComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CenterStructureDetailComponent,
    resolve: {
      centerStructure: CenterStructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CenterStructureUpdateComponent,
    resolve: {
      centerStructure: CenterStructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CenterStructureUpdateComponent,
    resolve: {
      centerStructure: CenterStructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(centerStructureRoute)],
  exports: [RouterModule],
})
export class CenterStructureRoutingModule {}
