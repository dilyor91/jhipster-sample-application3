export interface IGreeting {
  id: number;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
}

export type NewGreeting = Omit<IGreeting, 'id'> & { id: null };
