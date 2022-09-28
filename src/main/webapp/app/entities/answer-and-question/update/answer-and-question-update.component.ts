import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AnswerAndQuestionFormService, AnswerAndQuestionFormGroup } from './answer-and-question-form.service';
import { IAnswerAndQuestion } from '../answer-and-question.model';
import { AnswerAndQuestionService } from '../service/answer-and-question.service';

@Component({
  selector: 'jhi-answer-and-question-update',
  templateUrl: './answer-and-question-update.component.html',
})
export class AnswerAndQuestionUpdateComponent implements OnInit {
  isSaving = false;
  answerAndQuestion: IAnswerAndQuestion | null = null;

  editForm: AnswerAndQuestionFormGroup = this.answerAndQuestionFormService.createAnswerAndQuestionFormGroup();

  constructor(
    protected answerAndQuestionService: AnswerAndQuestionService,
    protected answerAndQuestionFormService: AnswerAndQuestionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ answerAndQuestion }) => {
      this.answerAndQuestion = answerAndQuestion;
      if (answerAndQuestion) {
        this.updateForm(answerAndQuestion);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const answerAndQuestion = this.answerAndQuestionFormService.getAnswerAndQuestion(this.editForm);
    if (answerAndQuestion.id !== null) {
      this.subscribeToSaveResponse(this.answerAndQuestionService.update(answerAndQuestion));
    } else {
      this.subscribeToSaveResponse(this.answerAndQuestionService.create(answerAndQuestion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnswerAndQuestion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(answerAndQuestion: IAnswerAndQuestion): void {
    this.answerAndQuestion = answerAndQuestion;
    this.answerAndQuestionFormService.resetForm(this.editForm, answerAndQuestion);
  }
}
