import dayjs from 'dayjs/esm';

export interface ITimeTable {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  postedDate?: dayjs.Dayjs | null;
}

export type NewTimeTable = Omit<ITimeTable, 'id'> & { id: null };
