import { IInstitution } from 'app/entities/institution/institution.model';
import { IStudyAtKorea } from 'app/entities/study-at-korea/study-at-korea.model';
import { FileEntity } from 'app/entities/enumerations/file-entity.model';

export interface IFile {
  id: number;
  orginalName?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  fileFormat?: string | null;
  filePath?: string | null;
  fileEntity?: FileEntity | null;
  institution?: Pick<IInstitution, 'id'> | null;
  studyAtKorea?: Pick<IStudyAtKorea, 'id'> | null;
}

export type NewFile = Omit<IFile, 'id'> & { id: null };
