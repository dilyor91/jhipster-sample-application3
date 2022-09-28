import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AnswerAndQuestionComponent } from './list/answer-and-question.component';
import { AnswerAndQuestionDetailComponent } from './detail/answer-and-question-detail.component';
import { AnswerAndQuestionUpdateComponent } from './update/answer-and-question-update.component';
import { AnswerAndQuestionDeleteDialogComponent } from './delete/answer-and-question-delete-dialog.component';
import { AnswerAndQuestionRoutingModule } from './route/answer-and-question-routing.module';

@NgModule({
  imports: [SharedModule, AnswerAndQuestionRoutingModule],
  declarations: [
    AnswerAndQuestionComponent,
    AnswerAndQuestionDetailComponent,
    AnswerAndQuestionUpdateComponent,
    AnswerAndQuestionDeleteDialogComponent,
  ],
})
export class AnswerAndQuestionModule {}
