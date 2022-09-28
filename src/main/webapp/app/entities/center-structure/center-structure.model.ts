export interface ICenterStructure {
  id: number;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
}

export type NewCenterStructure = Omit<ICenterStructure, 'id'> & { id: null };
