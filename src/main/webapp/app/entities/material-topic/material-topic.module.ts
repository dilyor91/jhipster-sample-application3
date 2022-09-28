import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialTopicComponent } from './list/material-topic.component';
import { MaterialTopicDetailComponent } from './detail/material-topic-detail.component';
import { MaterialTopicUpdateComponent } from './update/material-topic-update.component';
import { MaterialTopicDeleteDialogComponent } from './delete/material-topic-delete-dialog.component';
import { MaterialTopicRoutingModule } from './route/material-topic-routing.module';

@NgModule({
  imports: [SharedModule, MaterialTopicRoutingModule],
  declarations: [MaterialTopicComponent, MaterialTopicDetailComponent, MaterialTopicUpdateComponent, MaterialTopicDeleteDialogComponent],
})
export class MaterialTopicModule {}
