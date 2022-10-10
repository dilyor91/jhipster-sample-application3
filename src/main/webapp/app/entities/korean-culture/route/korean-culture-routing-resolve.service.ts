import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKoreanCulture } from '../korean-culture.model';
import { KoreanCultureService } from '../service/korean-culture.service';

@Injectable({ providedIn: 'root' })
export class KoreanCultureRoutingResolveService implements Resolve<IKoreanCulture | null> {
  constructor(protected service: KoreanCultureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKoreanCulture | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((koreanCulture: HttpResponse<IKoreanCulture>) => {
          if (koreanCulture.body) {
            return of(koreanCulture.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
