import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOurHistory } from '../our-history.model';
import { OurHistoryService } from '../service/our-history.service';

@Injectable({ providedIn: 'root' })
export class OurHistoryRoutingResolveService implements Resolve<IOurHistory | null> {
  constructor(protected service: OurHistoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOurHistory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ourHistory: HttpResponse<IOurHistory>) => {
          if (ourHistory.body) {
            return of(ourHistory.body);
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
