import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnswerAndQuestion } from '../answer-and-question.model';
import { AnswerAndQuestionService } from '../service/answer-and-question.service';

@Injectable({ providedIn: 'root' })
export class AnswerAndQuestionRoutingResolveService implements Resolve<IAnswerAndQuestion | null> {
  constructor(protected service: AnswerAndQuestionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnswerAndQuestion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((answerAndQuestion: HttpResponse<IAnswerAndQuestion>) => {
          if (answerAndQuestion.body) {
            return of(answerAndQuestion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
