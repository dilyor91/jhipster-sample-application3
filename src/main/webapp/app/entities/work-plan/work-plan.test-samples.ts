import { PlanType } from 'app/entities/enumerations/plan-type.model';

import { IWorkPlan, NewWorkPlan } from './work-plan.model';

export const sampleWithRequiredData: IWorkPlan = {
  id: 35072,
};

export const sampleWithPartialData: IWorkPlan = {
  id: 1701,
};

export const sampleWithFullData: IWorkPlan = {
  id: 92397,
  titleUz: 'Cheese',
  titleRu: 'Solutions Bike Garden',
  titleKr: 'Landing multi-byte',
  contentUz: 'hacking Intelligent vortals',
  contentRu: 'B2C Plastic Borders',
  contentKr: 'wireless',
  planType: PlanType['MONTH'],
};

export const sampleWithNewData: NewWorkPlan = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
