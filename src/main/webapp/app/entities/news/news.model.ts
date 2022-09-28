import dayjs from 'dayjs/esm';

export interface INews {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  postedDate?: dayjs.Dayjs | null;
  status?: boolean | null;
}

export type NewNews = Omit<INews, 'id'> & { id: null };
