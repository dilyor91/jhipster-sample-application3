import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PopupComponent } from './list/popup.component';
import { PopupDetailComponent } from './detail/popup-detail.component';
import { PopupUpdateComponent } from './update/popup-update.component';
import { PopupDeleteDialogComponent } from './delete/popup-delete-dialog.component';
import { PopupRoutingModule } from './route/popup-routing.module';

@NgModule({
  imports: [SharedModule, PopupRoutingModule],
  declarations: [PopupComponent, PopupDetailComponent, PopupUpdateComponent, PopupDeleteDialogComponent],
})
export class PopupModule {}
