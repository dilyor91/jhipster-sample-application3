import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPopup, NewPopup } from '../popup.model';

export type PartialUpdatePopup = Partial<IPopup> & Pick<IPopup, 'id'>;

export type EntityResponseType = HttpResponse<IPopup>;
export type EntityArrayResponseType = HttpResponse<IPopup[]>;

@Injectable({ providedIn: 'root' })
export class PopupService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/popups');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(popup: NewPopup): Observable<EntityResponseType> {
    return this.http.post<IPopup>(this.resourceUrl, popup, { observe: 'response' });
  }

  update(popup: IPopup): Observable<EntityResponseType> {
    return this.http.put<IPopup>(`${this.resourceUrl}/${this.getPopupIdentifier(popup)}`, popup, { observe: 'response' });
  }

  partialUpdate(popup: PartialUpdatePopup): Observable<EntityResponseType> {
    return this.http.patch<IPopup>(`${this.resourceUrl}/${this.getPopupIdentifier(popup)}`, popup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPopup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPopup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPopupIdentifier(popup: Pick<IPopup, 'id'>): number {
    return popup.id;
  }

  comparePopup(o1: Pick<IPopup, 'id'> | null, o2: Pick<IPopup, 'id'> | null): boolean {
    return o1 && o2 ? this.getPopupIdentifier(o1) === this.getPopupIdentifier(o2) : o1 === o2;
  }

  addPopupToCollectionIfMissing<Type extends Pick<IPopup, 'id'>>(
    popupCollection: Type[],
    ...popupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const popups: Type[] = popupsToCheck.filter(isPresent);
    if (popups.length > 0) {
      const popupCollectionIdentifiers = popupCollection.map(popupItem => this.getPopupIdentifier(popupItem)!);
      const popupsToAdd = popups.filter(popupItem => {
        const popupIdentifier = this.getPopupIdentifier(popupItem);
        if (popupCollectionIdentifiers.includes(popupIdentifier)) {
          return false;
        }
        popupCollectionIdentifiers.push(popupIdentifier);
        return true;
      });
      return [...popupsToAdd, ...popupCollection];
    }
    return popupCollection;
  }
}
