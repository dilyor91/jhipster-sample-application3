import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICenterStructure } from '../center-structure.model';
import { CenterStructureService } from '../service/center-structure.service';

@Injectable({ providedIn: 'root' })
export class CenterStructureRoutingResolveService implements Resolve<ICenterStructure | null> {
  constructor(protected service: CenterStructureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICenterStructure | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((centerStructure: HttpResponse<ICenterStructure>) => {
          if (centerStructure.body) {
            return of(centerStructure.body);
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
