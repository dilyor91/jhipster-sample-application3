export interface IBanner {
  id: number;
  name?: string | null;
  bannerData?: string | null;
  status?: boolean | null;
}

export type NewBanner = Omit<IBanner, 'id'> & { id: null };
