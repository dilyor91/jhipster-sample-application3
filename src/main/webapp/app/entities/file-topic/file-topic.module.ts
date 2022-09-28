import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FileTopicComponent } from './list/file-topic.component';
import { FileTopicDetailComponent } from './detail/file-topic-detail.component';
import { FileTopicUpdateComponent } from './update/file-topic-update.component';
import { FileTopicDeleteDialogComponent } from './delete/file-topic-delete-dialog.component';
import { FileTopicRoutingModule } from './route/file-topic-routing.module';

@NgModule({
  imports: [SharedModule, FileTopicRoutingModule],
  declarations: [FileTopicComponent, FileTopicDetailComponent, FileTopicUpdateComponent, FileTopicDeleteDialogComponent],
})
export class FileTopicModule {}
