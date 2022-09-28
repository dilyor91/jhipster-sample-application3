import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StudyAtKoreaComponent } from './list/study-at-korea.component';
import { StudyAtKoreaDetailComponent } from './detail/study-at-korea-detail.component';
import { StudyAtKoreaUpdateComponent } from './update/study-at-korea-update.component';
import { StudyAtKoreaDeleteDialogComponent } from './delete/study-at-korea-delete-dialog.component';
import { StudyAtKoreaRoutingModule } from './route/study-at-korea-routing.module';

@NgModule({
  imports: [SharedModule, StudyAtKoreaRoutingModule],
  declarations: [StudyAtKoreaComponent, StudyAtKoreaDetailComponent, StudyAtKoreaUpdateComponent, StudyAtKoreaDeleteDialogComponent],
})
export class StudyAtKoreaModule {}
