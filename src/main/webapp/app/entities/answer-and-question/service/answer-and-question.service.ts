import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnswerAndQuestion, NewAnswerAndQuestion } from '../answer-and-question.model';

export type PartialUpdateAnswerAndQuestion = Partial<IAnswerAndQuestion> & Pick<IAnswerAndQuestion, 'id'>;

export type EntityResponseType = HttpResponse<IAnswerAndQuestion>;
export type EntityArrayResponseType = HttpResponse<IAnswerAndQuestion[]>;

@Injectable({ providedIn: 'root' })
export class AnswerAndQuestionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/answer-and-questions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(answerAndQuestion: NewAnswerAndQuestion): Observable<EntityResponseType> {
    return this.http.post<IAnswerAndQuestion>(this.resourceUrl, answerAndQuestion, { observe: 'response' });
  }

  update(answerAndQuestion: IAnswerAndQuestion): Observable<EntityResponseType> {
    return this.http.put<IAnswerAndQuestion>(
      `${this.resourceUrl}/${this.getAnswerAndQuestionIdentifier(answerAndQuestion)}`,
      answerAndQuestion,
      { observe: 'response' }
    );
  }

  partialUpdate(answerAndQuestion: PartialUpdateAnswerAndQuestion): Observable<EntityResponseType> {
    return this.http.patch<IAnswerAndQuestion>(
      `${this.resourceUrl}/${this.getAnswerAndQuestionIdentifier(answerAndQuestion)}`,
      answerAndQuestion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnswerAndQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnswerAndQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnswerAndQuestionIdentifier(answerAndQuestion: Pick<IAnswerAndQuestion, 'id'>): number {
    return answerAndQuestion.id;
  }

  compareAnswerAndQuestion(o1: Pick<IAnswerAndQuestion, 'id'> | null, o2: Pick<IAnswerAndQuestion, 'id'> | null): boolean {
    return o1 && o2 ? this.getAnswerAndQuestionIdentifier(o1) === this.getAnswerAndQuestionIdentifier(o2) : o1 === o2;
  }

  addAnswerAndQuestionToCollectionIfMissing<Type extends Pick<IAnswerAndQuestion, 'id'>>(
    answerAndQuestionCollection: Type[],
    ...answerAndQuestionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const answerAndQuestions: Type[] = answerAndQuestionsToCheck.filter(isPresent);
    if (answerAndQuestions.length > 0) {
      const answerAndQuestionCollectionIdentifiers = answerAndQuestionCollection.map(
        answerAndQuestionItem => this.getAnswerAndQuestionIdentifier(answerAndQuestionItem)!
      );
      const answerAndQuestionsToAdd = answerAndQuestions.filter(answerAndQuestionItem => {
        const answerAndQuestionIdentifier = this.getAnswerAndQuestionIdentifier(answerAndQuestionItem);
        if (answerAndQuestionCollectionIdentifiers.includes(answerAndQuestionIdentifier)) {
          return false;
        }
        answerAndQuestionCollectionIdentifiers.push(answerAndQuestionIdentifier);
        return true;
      });
      return [...answerAndQuestionsToAdd, ...answerAndQuestionCollection];
    }
    return answerAndQuestionCollection;
  }
}
