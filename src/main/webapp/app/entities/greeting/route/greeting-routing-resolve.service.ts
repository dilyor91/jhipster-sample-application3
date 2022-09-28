import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGreeting } from '../greeting.model';
import { GreetingService } from '../service/greeting.service';

@Injectable({ providedIn: 'root' })
export class GreetingRoutingResolveService implements Resolve<IGreeting | null> {
  constructor(protected service: GreetingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGreeting | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((greeting: HttpResponse<IGreeting>) => {
          if (greeting.body) {
            return of(greeting.body);
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
