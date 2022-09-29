export interface IOwner {
  id: number;
  name?: string | null;
  family?: string | null;
}

export type NewOwner = Omit<IOwner, 'id'> & { id: null };
