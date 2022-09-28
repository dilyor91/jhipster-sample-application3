import dayjs from 'dayjs/esm';

export interface IOurHistory {
  id: number;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  postedDate?: dayjs.Dayjs | null;
}

export type NewOurHistory = Omit<IOurHistory, 'id'> & { id: null };
