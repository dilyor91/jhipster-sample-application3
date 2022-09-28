import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFileTopic } from '../file-topic.model';
import { FileTopicService } from '../service/file-topic.service';

@Injectable({ providedIn: 'root' })
export class FileTopicRoutingResolveService implements Resolve<IFileTopic | null> {
  constructor(protected service: FileTopicService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFileTopic | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fileTopic: HttpResponse<IFileTopic>) => {
          if (fileTopic.body) {
            return of(fileTopic.body);
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
