import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LogoComponent } from './list/logo.component';
import { LogoDetailComponent } from './detail/logo-detail.component';
import { LogoUpdateComponent } from './update/logo-update.component';
import { LogoDeleteDialogComponent } from './delete/logo-delete-dialog.component';
import { LogoRoutingModule } from './route/logo-routing.module';

@NgModule({
  imports: [SharedModule, LogoRoutingModule],
  declarations: [LogoComponent, LogoDetailComponent, LogoUpdateComponent, LogoDeleteDialogComponent],
})
export class LogoModule {}
