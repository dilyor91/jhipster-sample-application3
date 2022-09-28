export interface ILogo {
  id: number;
  name?: string | null;
  logoData?: string | null;
  status?: boolean | null;
}

export type NewLogo = Omit<ILogo, 'id'> & { id: null };
