import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WorkPlanComponent } from './list/work-plan.component';
import { WorkPlanDetailComponent } from './detail/work-plan-detail.component';
import { WorkPlanUpdateComponent } from './update/work-plan-update.component';
import { WorkPlanDeleteDialogComponent } from './delete/work-plan-delete-dialog.component';
import { WorkPlanRoutingModule } from './route/work-plan-routing.module';

@NgModule({
  imports: [SharedModule, WorkPlanRoutingModule],
  declarations: [WorkPlanComponent, WorkPlanDetailComponent, WorkPlanUpdateComponent, WorkPlanDeleteDialogComponent],
})
export class WorkPlanModule {}
