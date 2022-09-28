import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OurHistoryComponent } from './list/our-history.component';
import { OurHistoryDetailComponent } from './detail/our-history-detail.component';
import { OurHistoryUpdateComponent } from './update/our-history-update.component';
import { OurHistoryDeleteDialogComponent } from './delete/our-history-delete-dialog.component';
import { OurHistoryRoutingModule } from './route/our-history-routing.module';

@NgModule({
  imports: [SharedModule, OurHistoryRoutingModule],
  declarations: [OurHistoryComponent, OurHistoryDetailComponent, OurHistoryUpdateComponent, OurHistoryDeleteDialogComponent],
})
export class OurHistoryModule {}
