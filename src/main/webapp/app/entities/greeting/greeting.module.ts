import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GreetingComponent } from './list/greeting.component';
import { GreetingDetailComponent } from './detail/greeting-detail.component';
import { GreetingUpdateComponent } from './update/greeting-update.component';
import { GreetingDeleteDialogComponent } from './delete/greeting-delete-dialog.component';
import { GreetingRoutingModule } from './route/greeting-routing.module';

@NgModule({
  imports: [SharedModule, GreetingRoutingModule],
  declarations: [GreetingComponent, GreetingDetailComponent, GreetingUpdateComponent, GreetingDeleteDialogComponent],
})
export class GreetingModule {}
