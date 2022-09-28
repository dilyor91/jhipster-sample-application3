export interface IAlbum {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
}

export type NewAlbum = Omit<IAlbum, 'id'> & { id: null };
