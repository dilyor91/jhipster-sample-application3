import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogo, NewLogo } from '../logo.model';

export type PartialUpdateLogo = Partial<ILogo> & Pick<ILogo, 'id'>;

export type EntityResponseType = HttpResponse<ILogo>;
export type EntityArrayResponseType = HttpResponse<ILogo[]>;

@Injectable({ providedIn: 'root' })
export class LogoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/logos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(logo: NewLogo): Observable<EntityResponseType> {
    return this.http.post<ILogo>(this.resourceUrl, logo, { observe: 'response' });
  }

  update(logo: ILogo): Observable<EntityResponseType> {
    return this.http.put<ILogo>(`${this.resourceUrl}/${this.getLogoIdentifier(logo)}`, logo, { observe: 'response' });
  }

  partialUpdate(logo: PartialUpdateLogo): Observable<EntityResponseType> {
    return this.http.patch<ILogo>(`${this.resourceUrl}/${this.getLogoIdentifier(logo)}`, logo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILogo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILogo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogoIdentifier(logo: Pick<ILogo, 'id'>): number {
    return logo.id;
  }

  compareLogo(o1: Pick<ILogo, 'id'> | null, o2: Pick<ILogo, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogoIdentifier(o1) === this.getLogoIdentifier(o2) : o1 === o2;
  }

  addLogoToCollectionIfMissing<Type extends Pick<ILogo, 'id'>>(
    logoCollection: Type[],
    ...logosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logos: Type[] = logosToCheck.filter(isPresent);
    if (logos.length > 0) {
      const logoCollectionIdentifiers = logoCollection.map(logoItem => this.getLogoIdentifier(logoItem)!);
      const logosToAdd = logos.filter(logoItem => {
        const logoIdentifier = this.getLogoIdentifier(logoItem);
        if (logoCollectionIdentifiers.includes(logoIdentifier)) {
          return false;
        }
        logoCollectionIdentifiers.push(logoIdentifier);
        return true;
      });
      return [...logosToAdd, ...logoCollection];
    }
    return logoCollection;
  }
}
