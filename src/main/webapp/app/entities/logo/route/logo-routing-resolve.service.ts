import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogo } from '../logo.model';
import { LogoService } from '../service/logo.service';

@Injectable({ providedIn: 'root' })
export class LogoRoutingResolveService implements Resolve<ILogo | null> {
  constructor(protected service: LogoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILogo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((logo: HttpResponse<ILogo>) => {
          if (logo.body) {
            return of(logo.body);
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
