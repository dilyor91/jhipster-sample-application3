import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudyAtKorea } from '../study-at-korea.model';
import { StudyAtKoreaService } from '../service/study-at-korea.service';

@Injectable({ providedIn: 'root' })
export class StudyAtKoreaRoutingResolveService implements Resolve<IStudyAtKorea | null> {
  constructor(protected service: StudyAtKoreaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudyAtKorea | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((studyAtKorea: HttpResponse<IStudyAtKorea>) => {
          if (studyAtKorea.body) {
            return of(studyAtKorea.body);
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
