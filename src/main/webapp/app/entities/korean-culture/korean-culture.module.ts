import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { KoreanCultureComponent } from './list/korean-culture.component';
import { KoreanCultureDetailComponent } from './detail/korean-culture-detail.component';
import { KoreanCultureUpdateComponent } from './update/korean-culture-update.component';
import { KoreanCultureDeleteDialogComponent } from './delete/korean-culture-delete-dialog.component';
import { KoreanCultureRoutingModule } from './route/korean-culture-routing.module';

@NgModule({
  imports: [SharedModule, KoreanCultureRoutingModule],
  declarations: [KoreanCultureComponent, KoreanCultureDetailComponent, KoreanCultureUpdateComponent, KoreanCultureDeleteDialogComponent],
})
export class KoreanCultureModule {}
