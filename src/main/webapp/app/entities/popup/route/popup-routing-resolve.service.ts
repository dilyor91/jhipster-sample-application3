import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPopup } from '../popup.model';
import { PopupService } from '../service/popup.service';

@Injectable({ providedIn: 'root' })
export class PopupRoutingResolveService implements Resolve<IPopup | null> {
  constructor(protected service: PopupService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPopup | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((popup: HttpResponse<IPopup>) => {
          if (popup.body) {
            return of(popup.body);
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
