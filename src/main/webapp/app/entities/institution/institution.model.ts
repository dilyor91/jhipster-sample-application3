import { InstitutType } from 'app/entities/enumerations/institut-type.model';

export interface IInstitution {
  id: number;
  institutionType?: InstitutType | null;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  contentUz?: string | null;
  contentRu?: string | null;
  contentKr?: string | null;
  logoName?: string | null;
  logoData?: string | null;
}

export type NewInstitution = Omit<IInstitution, 'id'> & { id: null };
