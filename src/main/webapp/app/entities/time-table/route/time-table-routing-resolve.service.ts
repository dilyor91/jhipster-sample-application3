import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITimeTable } from '../time-table.model';
import { TimeTableService } from '../service/time-table.service';

@Injectable({ providedIn: 'root' })
export class TimeTableRoutingResolveService implements Resolve<ITimeTable | null> {
  constructor(protected service: TimeTableService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimeTable | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((timeTable: HttpResponse<ITimeTable>) => {
          if (timeTable.body) {
            return of(timeTable.body);
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
