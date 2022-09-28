import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGreeting, NewGreeting } from '../greeting.model';

export type PartialUpdateGreeting = Partial<IGreeting> & Pick<IGreeting, 'id'>;

export type EntityResponseType = HttpResponse<IGreeting>;
export type EntityArrayResponseType = HttpResponse<IGreeting[]>;

@Injectable({ providedIn: 'root' })
export class GreetingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/greetings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(greeting: NewGreeting): Observable<EntityResponseType> {
    return this.http.post<IGreeting>(this.resourceUrl, greeting, { observe: 'response' });
  }

  update(greeting: IGreeting): Observable<EntityResponseType> {
    return this.http.put<IGreeting>(`${this.resourceUrl}/${this.getGreetingIdentifier(greeting)}`, greeting, { observe: 'response' });
  }

  partialUpdate(greeting: PartialUpdateGreeting): Observable<EntityResponseType> {
    return this.http.patch<IGreeting>(`${this.resourceUrl}/${this.getGreetingIdentifier(greeting)}`, greeting, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGreeting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGreeting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGreetingIdentifier(greeting: Pick<IGreeting, 'id'>): number {
    return greeting.id;
  }

  compareGreeting(o1: Pick<IGreeting, 'id'> | null, o2: Pick<IGreeting, 'id'> | null): boolean {
    return o1 && o2 ? this.getGreetingIdentifier(o1) === this.getGreetingIdentifier(o2) : o1 === o2;
  }

  addGreetingToCollectionIfMissing<Type extends Pick<IGreeting, 'id'>>(
    greetingCollection: Type[],
    ...greetingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const greetings: Type[] = greetingsToCheck.filter(isPresent);
    if (greetings.length > 0) {
      const greetingCollectionIdentifiers = greetingCollection.map(greetingItem => this.getGreetingIdentifier(greetingItem)!);
      const greetingsToAdd = greetings.filter(greetingItem => {
        const greetingIdentifier = this.getGreetingIdentifier(greetingItem);
        if (greetingCollectionIdentifiers.includes(greetingIdentifier)) {
          return false;
        }
        greetingCollectionIdentifiers.push(greetingIdentifier);
        return true;
      });
      return [...greetingsToAdd, ...greetingCollection];
    }
    return greetingCollection;
  }
}
