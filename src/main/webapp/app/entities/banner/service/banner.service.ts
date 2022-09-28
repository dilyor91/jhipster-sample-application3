import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBanner, NewBanner } from '../banner.model';

export type PartialUpdateBanner = Partial<IBanner> & Pick<IBanner, 'id'>;

export type EntityResponseType = HttpResponse<IBanner>;
export type EntityArrayResponseType = HttpResponse<IBanner[]>;

@Injectable({ providedIn: 'root' })
export class BannerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/banners');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(banner: NewBanner): Observable<EntityResponseType> {
    return this.http.post<IBanner>(this.resourceUrl, banner, { observe: 'response' });
  }

  update(banner: IBanner): Observable<EntityResponseType> {
    return this.http.put<IBanner>(`${this.resourceUrl}/${this.getBannerIdentifier(banner)}`, banner, { observe: 'response' });
  }

  partialUpdate(banner: PartialUpdateBanner): Observable<EntityResponseType> {
    return this.http.patch<IBanner>(`${this.resourceUrl}/${this.getBannerIdentifier(banner)}`, banner, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBanner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBanner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBannerIdentifier(banner: Pick<IBanner, 'id'>): number {
    return banner.id;
  }

  compareBanner(o1: Pick<IBanner, 'id'> | null, o2: Pick<IBanner, 'id'> | null): boolean {
    return o1 && o2 ? this.getBannerIdentifier(o1) === this.getBannerIdentifier(o2) : o1 === o2;
  }

  addBannerToCollectionIfMissing<Type extends Pick<IBanner, 'id'>>(
    bannerCollection: Type[],
    ...bannersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const banners: Type[] = bannersToCheck.filter(isPresent);
    if (banners.length > 0) {
      const bannerCollectionIdentifiers = bannerCollection.map(bannerItem => this.getBannerIdentifier(bannerItem)!);
      const bannersToAdd = banners.filter(bannerItem => {
        const bannerIdentifier = this.getBannerIdentifier(bannerItem);
        if (bannerCollectionIdentifiers.includes(bannerIdentifier)) {
          return false;
        }
        bannerCollectionIdentifiers.push(bannerIdentifier);
        return true;
      });
      return [...bannersToAdd, ...bannerCollection];
    }
    return bannerCollection;
  }
}
