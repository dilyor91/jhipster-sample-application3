import { PlanType } from 'app/entities/enumerations/plan-type.model';

export interface IWorkPlan {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  planType?: PlanType | null;
}

export type NewWorkPlan = Omit<IWorkPlan, 'id'> & { id: null };
