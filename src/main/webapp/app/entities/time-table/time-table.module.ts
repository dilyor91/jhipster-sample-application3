import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TimeTableComponent } from './list/time-table.component';
import { TimeTableDetailComponent } from './detail/time-table-detail.component';
import { TimeTableUpdateComponent } from './update/time-table-update.component';
import { TimeTableDeleteDialogComponent } from './delete/time-table-delete-dialog.component';
import { TimeTableRoutingModule } from './route/time-table-routing.module';

@NgModule({
  imports: [SharedModule, TimeTableRoutingModule],
  declarations: [TimeTableComponent, TimeTableDetailComponent, TimeTableUpdateComponent, TimeTableDeleteDialogComponent],
})
export class TimeTableModule {}
