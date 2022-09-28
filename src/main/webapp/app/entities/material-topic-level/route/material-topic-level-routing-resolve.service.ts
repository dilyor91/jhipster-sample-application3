import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaterialTopicLevel } from '../material-topic-level.model';
import { MaterialTopicLevelService } from '../service/material-topic-level.service';

@Injectable({ providedIn: 'root' })
export class MaterialTopicLevelRoutingResolveService implements Resolve<IMaterialTopicLevel | null> {
  constructor(protected service: MaterialTopicLevelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterialTopicLevel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((materialTopicLevel: HttpResponse<IMaterialTopicLevel>) => {
          if (materialTopicLevel.body) {
            return of(materialTopicLevel.body);
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
