import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaterialTopic, NewMaterialTopic } from '../material-topic.model';

export type PartialUpdateMaterialTopic = Partial<IMaterialTopic> & Pick<IMaterialTopic, 'id'>;

export type EntityResponseType = HttpResponse<IMaterialTopic>;
export type EntityArrayResponseType = HttpResponse<IMaterialTopic[]>;

@Injectable({ providedIn: 'root' })
export class MaterialTopicService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/material-topics');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(materialTopic: NewMaterialTopic): Observable<EntityResponseType> {
    return this.http.post<IMaterialTopic>(this.resourceUrl, materialTopic, { observe: 'response' });
  }

  update(materialTopic: IMaterialTopic): Observable<EntityResponseType> {
    return this.http.put<IMaterialTopic>(`${this.resourceUrl}/${this.getMaterialTopicIdentifier(materialTopic)}`, materialTopic, {
      observe: 'response',
    });
  }

  partialUpdate(materialTopic: PartialUpdateMaterialTopic): Observable<EntityResponseType> {
    return this.http.patch<IMaterialTopic>(`${this.resourceUrl}/${this.getMaterialTopicIdentifier(materialTopic)}`, materialTopic, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterialTopic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterialTopic[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMaterialTopicIdentifier(materialTopic: Pick<IMaterialTopic, 'id'>): number {
    return materialTopic.id;
  }

  compareMaterialTopic(o1: Pick<IMaterialTopic, 'id'> | null, o2: Pick<IMaterialTopic, 'id'> | null): boolean {
    return o1 && o2 ? this.getMaterialTopicIdentifier(o1) === this.getMaterialTopicIdentifier(o2) : o1 === o2;
  }

  addMaterialTopicToCollectionIfMissing<Type extends Pick<IMaterialTopic, 'id'>>(
    materialTopicCollection: Type[],
    ...materialTopicsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const materialTopics: Type[] = materialTopicsToCheck.filter(isPresent);
    if (materialTopics.length > 0) {
      const materialTopicCollectionIdentifiers = materialTopicCollection.map(
        materialTopicItem => this.getMaterialTopicIdentifier(materialTopicItem)!
      );
      const materialTopicsToAdd = materialTopics.filter(materialTopicItem => {
        const materialTopicIdentifier = this.getMaterialTopicIdentifier(materialTopicItem);
        if (materialTopicCollectionIdentifiers.includes(materialTopicIdentifier)) {
          return false;
        }
        materialTopicCollectionIdentifiers.push(materialTopicIdentifier);
        return true;
      });
      return [...materialTopicsToAdd, ...materialTopicCollection];
    }
    return materialTopicCollection;
  }
}
