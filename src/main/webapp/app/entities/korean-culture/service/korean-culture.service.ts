import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKoreanCulture, NewKoreanCulture } from '../korean-culture.model';

export type PartialUpdateKoreanCulture = Partial<IKoreanCulture> & Pick<IKoreanCulture, 'id'>;

export type EntityResponseType = HttpResponse<IKoreanCulture>;
export type EntityArrayResponseType = HttpResponse<IKoreanCulture[]>;

@Injectable({ providedIn: 'root' })
export class KoreanCultureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/korean-cultures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(koreanCulture: NewKoreanCulture): Observable<EntityResponseType> {
    return this.http.post<IKoreanCulture>(this.resourceUrl, koreanCulture, { observe: 'response' });
  }

  update(koreanCulture: IKoreanCulture): Observable<EntityResponseType> {
    return this.http.put<IKoreanCulture>(`${this.resourceUrl}/${this.getKoreanCultureIdentifier(koreanCulture)}`, koreanCulture, {
      observe: 'response',
    });
  }

  partialUpdate(koreanCulture: PartialUpdateKoreanCulture): Observable<EntityResponseType> {
    return this.http.patch<IKoreanCulture>(`${this.resourceUrl}/${this.getKoreanCultureIdentifier(koreanCulture)}`, koreanCulture, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKoreanCulture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKoreanCulture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKoreanCultureIdentifier(koreanCulture: Pick<IKoreanCulture, 'id'>): number {
    return koreanCulture.id;
  }

  compareKoreanCulture(o1: Pick<IKoreanCulture, 'id'> | null, o2: Pick<IKoreanCulture, 'id'> | null): boolean {
    return o1 && o2 ? this.getKoreanCultureIdentifier(o1) === this.getKoreanCultureIdentifier(o2) : o1 === o2;
  }

  addKoreanCultureToCollectionIfMissing<Type extends Pick<IKoreanCulture, 'id'>>(
    koreanCultureCollection: Type[],
    ...koreanCulturesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const koreanCultures: Type[] = koreanCulturesToCheck.filter(isPresent);
    if (koreanCultures.length > 0) {
      const koreanCultureCollectionIdentifiers = koreanCultureCollection.map(
        koreanCultureItem => this.getKoreanCultureIdentifier(koreanCultureItem)!
      );
      const koreanCulturesToAdd = koreanCultures.filter(koreanCultureItem => {
        const koreanCultureIdentifier = this.getKoreanCultureIdentifier(koreanCultureItem);
        if (koreanCultureCollectionIdentifiers.includes(koreanCultureIdentifier)) {
          return false;
        }
        koreanCultureCollectionIdentifiers.push(koreanCultureIdentifier);
        return true;
      });
      return [...koreanCulturesToAdd, ...koreanCultureCollection];
    }
    return koreanCultureCollection;
  }
}
