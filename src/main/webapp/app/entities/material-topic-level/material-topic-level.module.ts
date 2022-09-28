import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialTopicLevelComponent } from './list/material-topic-level.component';
import { MaterialTopicLevelDetailComponent } from './detail/material-topic-level-detail.component';
import { MaterialTopicLevelUpdateComponent } from './update/material-topic-level-update.component';
import { MaterialTopicLevelDeleteDialogComponent } from './delete/material-topic-level-delete-dialog.component';
import { MaterialTopicLevelRoutingModule } from './route/material-topic-level-routing.module';

@NgModule({
  imports: [SharedModule, MaterialTopicLevelRoutingModule],
  declarations: [
    MaterialTopicLevelComponent,
    MaterialTopicLevelDetailComponent,
    MaterialTopicLevelUpdateComponent,
    MaterialTopicLevelDeleteDialogComponent,
  ],
})
export class MaterialTopicLevelModule {}
