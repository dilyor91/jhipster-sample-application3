import { IOwner } from 'app/entities/owner/owner.model';

export interface ICar {
  id: number;
  name?: string | null;
  color?: string | null;
  owner?: Pick<IOwner, 'id'> | null;
}

export type NewCar = Omit<ICar, 'id'> & { id: null };
