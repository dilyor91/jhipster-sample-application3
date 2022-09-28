import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOurHistory, NewOurHistory } from '../our-history.model';

export type PartialUpdateOurHistory = Partial<IOurHistory> & Pick<IOurHistory, 'id'>;

type RestOf<T extends IOurHistory | NewOurHistory> = Omit<T, 'postedDate'> & {
  postedDate?: string | null;
};

export type RestOurHistory = RestOf<IOurHistory>;

export type NewRestOurHistory = RestOf<NewOurHistory>;

export type PartialUpdateRestOurHistory = RestOf<PartialUpdateOurHistory>;

export type EntityResponseType = HttpResponse<IOurHistory>;
export type EntityArrayResponseType = HttpResponse<IOurHistory[]>;

@Injectable({ providedIn: 'root' })
export class OurHistoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/our-histories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ourHistory: NewOurHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ourHistory);
    return this.http
      .post<RestOurHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(ourHistory: IOurHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ourHistory);
    return this.http
      .put<RestOurHistory>(`${this.resourceUrl}/${this.getOurHistoryIdentifier(ourHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(ourHistory: PartialUpdateOurHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ourHistory);
    return this.http
      .patch<RestOurHistory>(`${this.resourceUrl}/${this.getOurHistoryIdentifier(ourHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOurHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOurHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOurHistoryIdentifier(ourHistory: Pick<IOurHistory, 'id'>): number {
    return ourHistory.id;
  }

  compareOurHistory(o1: Pick<IOurHistory, 'id'> | null, o2: Pick<IOurHistory, 'id'> | null): boolean {
    return o1 && o2 ? this.getOurHistoryIdentifier(o1) === this.getOurHistoryIdentifier(o2) : o1 === o2;
  }

  addOurHistoryToCollectionIfMissing<Type extends Pick<IOurHistory, 'id'>>(
    ourHistoryCollection: Type[],
    ...ourHistoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ourHistories: Type[] = ourHistoriesToCheck.filter(isPresent);
    if (ourHistories.length > 0) {
      const ourHistoryCollectionIdentifiers = ourHistoryCollection.map(ourHistoryItem => this.getOurHistoryIdentifier(ourHistoryItem)!);
      const ourHistoriesToAdd = ourHistories.filter(ourHistoryItem => {
        const ourHistoryIdentifier = this.getOurHistoryIdentifier(ourHistoryItem);
        if (ourHistoryCollectionIdentifiers.includes(ourHistoryIdentifier)) {
          return false;
        }
        ourHistoryCollectionIdentifiers.push(ourHistoryIdentifier);
        return true;
      });
      return [...ourHistoriesToAdd, ...ourHistoryCollection];
    }
    return ourHistoryCollection;
  }

  protected convertDateFromClient<T extends IOurHistory | NewOurHistory | PartialUpdateOurHistory>(ourHistory: T): RestOf<T> {
    return {
      ...ourHistory,
      postedDate: ourHistory.postedDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restOurHistory: RestOurHistory): IOurHistory {
    return {
      ...restOurHistory,
      postedDate: restOurHistory.postedDate ? dayjs(restOurHistory.postedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOurHistory>): HttpResponse<IOurHistory> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOurHistory[]>): HttpResponse<IOurHistory[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
