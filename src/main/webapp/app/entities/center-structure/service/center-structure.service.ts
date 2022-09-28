import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICenterStructure, NewCenterStructure } from '../center-structure.model';

export type PartialUpdateCenterStructure = Partial<ICenterStructure> & Pick<ICenterStructure, 'id'>;

export type EntityResponseType = HttpResponse<ICenterStructure>;
export type EntityArrayResponseType = HttpResponse<ICenterStructure[]>;

@Injectable({ providedIn: 'root' })
export class CenterStructureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/center-structures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(centerStructure: NewCenterStructure): Observable<EntityResponseType> {
    return this.http.post<ICenterStructure>(this.resourceUrl, centerStructure, { observe: 'response' });
  }

  update(centerStructure: ICenterStructure): Observable<EntityResponseType> {
    return this.http.put<ICenterStructure>(`${this.resourceUrl}/${this.getCenterStructureIdentifier(centerStructure)}`, centerStructure, {
      observe: 'response',
    });
  }

  partialUpdate(centerStructure: PartialUpdateCenterStructure): Observable<EntityResponseType> {
    return this.http.patch<ICenterStructure>(`${this.resourceUrl}/${this.getCenterStructureIdentifier(centerStructure)}`, centerStructure, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICenterStructure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICenterStructure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCenterStructureIdentifier(centerStructure: Pick<ICenterStructure, 'id'>): number {
    return centerStructure.id;
  }

  compareCenterStructure(o1: Pick<ICenterStructure, 'id'> | null, o2: Pick<ICenterStructure, 'id'> | null): boolean {
    return o1 && o2 ? this.getCenterStructureIdentifier(o1) === this.getCenterStructureIdentifier(o2) : o1 === o2;
  }

  addCenterStructureToCollectionIfMissing<Type extends Pick<ICenterStructure, 'id'>>(
    centerStructureCollection: Type[],
    ...centerStructuresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const centerStructures: Type[] = centerStructuresToCheck.filter(isPresent);
    if (centerStructures.length > 0) {
      const centerStructureCollectionIdentifiers = centerStructureCollection.map(
        centerStructureItem => this.getCenterStructureIdentifier(centerStructureItem)!
      );
      const centerStructuresToAdd = centerStructures.filter(centerStructureItem => {
        const centerStructureIdentifier = this.getCenterStructureIdentifier(centerStructureItem);
        if (centerStructureCollectionIdentifiers.includes(centerStructureIdentifier)) {
          return false;
        }
        centerStructureCollectionIdentifiers.push(centerStructureIdentifier);
        return true;
      });
      return [...centerStructuresToAdd, ...centerStructureCollection];
    }
    return centerStructureCollection;
  }
}
