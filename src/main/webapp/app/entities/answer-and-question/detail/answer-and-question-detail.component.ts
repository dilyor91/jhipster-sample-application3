import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnswerAndQuestion } from '../answer-and-question.model';

@Component({
  selector: 'jhi-answer-and-question-detail',
  templateUrl: './answer-and-question-detail.component.html',
})
export class AnswerAndQuestionDetailComponent implements OnInit {
  answerAndQuestion: IAnswerAndQuestion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ answerAndQuestion }) => {
      this.answerAndQuestion = answerAndQuestion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
