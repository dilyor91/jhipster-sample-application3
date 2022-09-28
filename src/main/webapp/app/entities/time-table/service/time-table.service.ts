import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITimeTable, NewTimeTable } from '../time-table.model';

export type PartialUpdateTimeTable = Partial<ITimeTable> & Pick<ITimeTable, 'id'>;

type RestOf<T extends ITimeTable | NewTimeTable> = Omit<T, 'postedDate'> & {
  postedDate?: string | null;
};

export type RestTimeTable = RestOf<ITimeTable>;

export type NewRestTimeTable = RestOf<NewTimeTable>;

export type PartialUpdateRestTimeTable = RestOf<PartialUpdateTimeTable>;

export type EntityResponseType = HttpResponse<ITimeTable>;
export type EntityArrayResponseType = HttpResponse<ITimeTable[]>;

@Injectable({ providedIn: 'root' })
export class TimeTableService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/time-tables');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(timeTable: NewTimeTable): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeTable);
    return this.http
      .post<RestTimeTable>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(timeTable: ITimeTable): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeTable);
    return this.http
      .put<RestTimeTable>(`${this.resourceUrl}/${this.getTimeTableIdentifier(timeTable)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(timeTable: PartialUpdateTimeTable): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeTable);
    return this.http
      .patch<RestTimeTable>(`${this.resourceUrl}/${this.getTimeTableIdentifier(timeTable)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTimeTable>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTimeTable[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTimeTableIdentifier(timeTable: Pick<ITimeTable, 'id'>): number {
    return timeTable.id;
  }

  compareTimeTable(o1: Pick<ITimeTable, 'id'> | null, o2: Pick<ITimeTable, 'id'> | null): boolean {
    return o1 && o2 ? this.getTimeTableIdentifier(o1) === this.getTimeTableIdentifier(o2) : o1 === o2;
  }

  addTimeTableToCollectionIfMissing<Type extends Pick<ITimeTable, 'id'>>(
    timeTableCollection: Type[],
    ...timeTablesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const timeTables: Type[] = timeTablesToCheck.filter(isPresent);
    if (timeTables.length > 0) {
      const timeTableCollectionIdentifiers = timeTableCollection.map(timeTableItem => this.getTimeTableIdentifier(timeTableItem)!);
      const timeTablesToAdd = timeTables.filter(timeTableItem => {
        const timeTableIdentifier = this.getTimeTableIdentifier(timeTableItem);
        if (timeTableCollectionIdentifiers.includes(timeTableIdentifier)) {
          return false;
        }
        timeTableCollectionIdentifiers.push(timeTableIdentifier);
        return true;
      });
      return [...timeTablesToAdd, ...timeTableCollection];
    }
    return timeTableCollection;
  }

  protected convertDateFromClient<T extends ITimeTable | NewTimeTable | PartialUpdateTimeTable>(timeTable: T): RestOf<T> {
    return {
      ...timeTable,
      postedDate: timeTable.postedDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTimeTable: RestTimeTable): ITimeTable {
    return {
      ...restTimeTable,
      postedDate: restTimeTable.postedDate ? dayjs(restTimeTable.postedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTimeTable>): HttpResponse<ITimeTable> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTimeTable[]>): HttpResponse<ITimeTable[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
