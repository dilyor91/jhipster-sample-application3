import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaterialTopicLevel, NewMaterialTopicLevel } from '../material-topic-level.model';

export type PartialUpdateMaterialTopicLevel = Partial<IMaterialTopicLevel> & Pick<IMaterialTopicLevel, 'id'>;

export type EntityResponseType = HttpResponse<IMaterialTopicLevel>;
export type EntityArrayResponseType = HttpResponse<IMaterialTopicLevel[]>;

@Injectable({ providedIn: 'root' })
export class MaterialTopicLevelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/material-topic-levels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(materialTopicLevel: NewMaterialTopicLevel): Observable<EntityResponseType> {
    return this.http.post<IMaterialTopicLevel>(this.resourceUrl, materialTopicLevel, { observe: 'response' });
  }

  update(materialTopicLevel: IMaterialTopicLevel): Observable<EntityResponseType> {
    return this.http.put<IMaterialTopicLevel>(
      `${this.resourceUrl}/${this.getMaterialTopicLevelIdentifier(materialTopicLevel)}`,
      materialTopicLevel,
      { observe: 'response' }
    );
  }

  partialUpdate(materialTopicLevel: PartialUpdateMaterialTopicLevel): Observable<EntityResponseType> {
    return this.http.patch<IMaterialTopicLevel>(
      `${this.resourceUrl}/${this.getMaterialTopicLevelIdentifier(materialTopicLevel)}`,
      materialTopicLevel,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterialTopicLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterialTopicLevel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMaterialTopicLevelIdentifier(materialTopicLevel: Pick<IMaterialTopicLevel, 'id'>): number {
    return materialTopicLevel.id;
  }

  compareMaterialTopicLevel(o1: Pick<IMaterialTopicLevel, 'id'> | null, o2: Pick<IMaterialTopicLevel, 'id'> | null): boolean {
    return o1 && o2 ? this.getMaterialTopicLevelIdentifier(o1) === this.getMaterialTopicLevelIdentifier(o2) : o1 === o2;
  }

  addMaterialTopicLevelToCollectionIfMissing<Type extends Pick<IMaterialTopicLevel, 'id'>>(
    materialTopicLevelCollection: Type[],
    ...materialTopicLevelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const materialTopicLevels: Type[] = materialTopicLevelsToCheck.filter(isPresent);
    if (materialTopicLevels.length > 0) {
      const materialTopicLevelCollectionIdentifiers = materialTopicLevelCollection.map(
        materialTopicLevelItem => this.getMaterialTopicLevelIdentifier(materialTopicLevelItem)!
      );
      const materialTopicLevelsToAdd = materialTopicLevels.filter(materialTopicLevelItem => {
        const materialTopicLevelIdentifier = this.getMaterialTopicLevelIdentifier(materialTopicLevelItem);
        if (materialTopicLevelCollectionIdentifiers.includes(materialTopicLevelIdentifier)) {
          return false;
        }
        materialTopicLevelCollectionIdentifiers.push(materialTopicLevelIdentifier);
        return true;
      });
      return [...materialTopicLevelsToAdd, ...materialTopicLevelCollection];
    }
    return materialTopicLevelCollection;
  }
}
