import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudyAtKorea, NewStudyAtKorea } from '../study-at-korea.model';

export type PartialUpdateStudyAtKorea = Partial<IStudyAtKorea> & Pick<IStudyAtKorea, 'id'>;

export type EntityResponseType = HttpResponse<IStudyAtKorea>;
export type EntityArrayResponseType = HttpResponse<IStudyAtKorea[]>;

@Injectable({ providedIn: 'root' })
export class StudyAtKoreaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/study-at-koreas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(studyAtKorea: NewStudyAtKorea): Observable<EntityResponseType> {
    return this.http.post<IStudyAtKorea>(this.resourceUrl, studyAtKorea, { observe: 'response' });
  }

  update(studyAtKorea: IStudyAtKorea): Observable<EntityResponseType> {
    return this.http.put<IStudyAtKorea>(`${this.resourceUrl}/${this.getStudyAtKoreaIdentifier(studyAtKorea)}`, studyAtKorea, {
      observe: 'response',
    });
  }

  partialUpdate(studyAtKorea: PartialUpdateStudyAtKorea): Observable<EntityResponseType> {
    return this.http.patch<IStudyAtKorea>(`${this.resourceUrl}/${this.getStudyAtKoreaIdentifier(studyAtKorea)}`, studyAtKorea, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudyAtKorea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudyAtKorea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudyAtKoreaIdentifier(studyAtKorea: Pick<IStudyAtKorea, 'id'>): number {
    return studyAtKorea.id;
  }

  compareStudyAtKorea(o1: Pick<IStudyAtKorea, 'id'> | null, o2: Pick<IStudyAtKorea, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudyAtKoreaIdentifier(o1) === this.getStudyAtKoreaIdentifier(o2) : o1 === o2;
  }

  addStudyAtKoreaToCollectionIfMissing<Type extends Pick<IStudyAtKorea, 'id'>>(
    studyAtKoreaCollection: Type[],
    ...studyAtKoreasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studyAtKoreas: Type[] = studyAtKoreasToCheck.filter(isPresent);
    if (studyAtKoreas.length > 0) {
      const studyAtKoreaCollectionIdentifiers = studyAtKoreaCollection.map(
        studyAtKoreaItem => this.getStudyAtKoreaIdentifier(studyAtKoreaItem)!
      );
      const studyAtKoreasToAdd = studyAtKoreas.filter(studyAtKoreaItem => {
        const studyAtKoreaIdentifier = this.getStudyAtKoreaIdentifier(studyAtKoreaItem);
        if (studyAtKoreaCollectionIdentifiers.includes(studyAtKoreaIdentifier)) {
          return false;
        }
        studyAtKoreaCollectionIdentifiers.push(studyAtKoreaIdentifier);
        return true;
      });
      return [...studyAtKoreasToAdd, ...studyAtKoreaCollection];
    }
    return studyAtKoreaCollection;
  }
}
