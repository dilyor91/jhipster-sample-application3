export interface IAddress {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
}

export type NewAddress = Omit<IAddress, 'id'> & { id: null };
