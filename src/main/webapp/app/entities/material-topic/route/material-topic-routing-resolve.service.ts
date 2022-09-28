import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaterialTopic } from '../material-topic.model';
import { MaterialTopicService } from '../service/material-topic.service';

@Injectable({ providedIn: 'root' })
export class MaterialTopicRoutingResolveService implements Resolve<IMaterialTopic | null> {
  constructor(protected service: MaterialTopicService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterialTopic | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((materialTopic: HttpResponse<IMaterialTopic>) => {
          if (materialTopic.body) {
            return of(materialTopic.body);
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
