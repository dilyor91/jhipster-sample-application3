import { KoreanCultureType } from 'app/entities/enumerations/korean-culture-type.model';

export interface IKoreanCulture {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  koreanCultureTYpe?: KoreanCultureType | null;
}

export type NewKoreanCulture = Omit<IKoreanCulture, 'id'> & { id: null };
