import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CenterStructureComponent } from './list/center-structure.component';
import { CenterStructureDetailComponent } from './detail/center-structure-detail.component';
import { CenterStructureUpdateComponent } from './update/center-structure-update.component';
import { CenterStructureDeleteDialogComponent } from './delete/center-structure-delete-dialog.component';
import { CenterStructureRoutingModule } from './route/center-structure-routing.module';

@NgModule({
  imports: [SharedModule, CenterStructureRoutingModule],
  declarations: [
    CenterStructureComponent,
    CenterStructureDetailComponent,
    CenterStructureUpdateComponent,
    CenterStructureDeleteDialogComponent,
  ],
})
export class CenterStructureModule {}
