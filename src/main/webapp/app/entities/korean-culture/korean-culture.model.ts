export interface IKoreanCulture {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
}

export type NewKoreanCulture = Omit<IKoreanCulture, 'id'> & { id: null };
