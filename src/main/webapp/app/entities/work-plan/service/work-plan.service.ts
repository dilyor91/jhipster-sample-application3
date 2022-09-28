import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWorkPlan, NewWorkPlan } from '../work-plan.model';

export type PartialUpdateWorkPlan = Partial<IWorkPlan> & Pick<IWorkPlan, 'id'>;

export type EntityResponseType = HttpResponse<IWorkPlan>;
export type EntityArrayResponseType = HttpResponse<IWorkPlan[]>;

@Injectable({ providedIn: 'root' })
export class WorkPlanService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/work-plans');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(workPlan: NewWorkPlan): Observable<EntityResponseType> {
    return this.http.post<IWorkPlan>(this.resourceUrl, workPlan, { observe: 'response' });
  }

  update(workPlan: IWorkPlan): Observable<EntityResponseType> {
    return this.http.put<IWorkPlan>(`${this.resourceUrl}/${this.getWorkPlanIdentifier(workPlan)}`, workPlan, { observe: 'response' });
  }

  partialUpdate(workPlan: PartialUpdateWorkPlan): Observable<EntityResponseType> {
    return this.http.patch<IWorkPlan>(`${this.resourceUrl}/${this.getWorkPlanIdentifier(workPlan)}`, workPlan, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorkPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorkPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWorkPlanIdentifier(workPlan: Pick<IWorkPlan, 'id'>): number {
    return workPlan.id;
  }

  compareWorkPlan(o1: Pick<IWorkPlan, 'id'> | null, o2: Pick<IWorkPlan, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkPlanIdentifier(o1) === this.getWorkPlanIdentifier(o2) : o1 === o2;
  }

  addWorkPlanToCollectionIfMissing<Type extends Pick<IWorkPlan, 'id'>>(
    workPlanCollection: Type[],
    ...workPlansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workPlans: Type[] = workPlansToCheck.filter(isPresent);
    if (workPlans.length > 0) {
      const workPlanCollectionIdentifiers = workPlanCollection.map(workPlanItem => this.getWorkPlanIdentifier(workPlanItem)!);
      const workPlansToAdd = workPlans.filter(workPlanItem => {
        const workPlanIdentifier = this.getWorkPlanIdentifier(workPlanItem);
        if (workPlanCollectionIdentifiers.includes(workPlanIdentifier)) {
          return false;
        }
        workPlanCollectionIdentifiers.push(workPlanIdentifier);
        return true;
      });
      return [...workPlansToAdd, ...workPlanCollection];
    }
    return workPlanCollection;
  }
}
