import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFileTopic, NewFileTopic } from '../file-topic.model';

export type PartialUpdateFileTopic = Partial<IFileTopic> & Pick<IFileTopic, 'id'>;

export type EntityResponseType = HttpResponse<IFileTopic>;
export type EntityArrayResponseType = HttpResponse<IFileTopic[]>;

@Injectable({ providedIn: 'root' })
export class FileTopicService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/file-topics');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fileTopic: NewFileTopic): Observable<EntityResponseType> {
    return this.http.post<IFileTopic>(this.resourceUrl, fileTopic, { observe: 'response' });
  }

  update(fileTopic: IFileTopic): Observable<EntityResponseType> {
    return this.http.put<IFileTopic>(`${this.resourceUrl}/${this.getFileTopicIdentifier(fileTopic)}`, fileTopic, { observe: 'response' });
  }

  partialUpdate(fileTopic: PartialUpdateFileTopic): Observable<EntityResponseType> {
    return this.http.patch<IFileTopic>(`${this.resourceUrl}/${this.getFileTopicIdentifier(fileTopic)}`, fileTopic, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFileTopic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFileTopic[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFileTopicIdentifier(fileTopic: Pick<IFileTopic, 'id'>): number {
    return fileTopic.id;
  }

  compareFileTopic(o1: Pick<IFileTopic, 'id'> | null, o2: Pick<IFileTopic, 'id'> | null): boolean {
    return o1 && o2 ? this.getFileTopicIdentifier(o1) === this.getFileTopicIdentifier(o2) : o1 === o2;
  }

  addFileTopicToCollectionIfMissing<Type extends Pick<IFileTopic, 'id'>>(
    fileTopicCollection: Type[],
    ...fileTopicsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fileTopics: Type[] = fileTopicsToCheck.filter(isPresent);
    if (fileTopics.length > 0) {
      const fileTopicCollectionIdentifiers = fileTopicCollection.map(fileTopicItem => this.getFileTopicIdentifier(fileTopicItem)!);
      const fileTopicsToAdd = fileTopics.filter(fileTopicItem => {
        const fileTopicIdentifier = this.getFileTopicIdentifier(fileTopicItem);
        if (fileTopicCollectionIdentifiers.includes(fileTopicIdentifier)) {
          return false;
        }
        fileTopicCollectionIdentifiers.push(fileTopicIdentifier);
        return true;
      });
      return [...fileTopicsToAdd, ...fileTopicCollection];
    }
    return fileTopicCollection;
  }
}
