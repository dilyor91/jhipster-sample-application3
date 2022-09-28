import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnswerAndQuestion } from '../answer-and-question.model';
import { AnswerAndQuestionService } from '../service/answer-and-question.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './answer-and-question-delete-dialog.component.html',
})
export class AnswerAndQuestionDeleteDialogComponent {
  answerAndQuestion?: IAnswerAndQuestion;

  constructor(protected answerAndQuestionService: AnswerAndQuestionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.answerAndQuestionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
