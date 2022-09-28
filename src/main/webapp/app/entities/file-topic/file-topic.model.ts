import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';

export interface IFileTopic {
  id: number;
  fileOrginalName?: string | null;
  fileNameUz?: string | null;
  fileNameRu?: string | null;
  fileNameKr?: string | null;
  fileType?: string | null;
  fileSize?: number | null;
  filePath?: string | null;
  materialTopicLevel?: Pick<IMaterialTopicLevel, 'id'> | null;
}

export type NewFileTopic = Omit<IFileTopic, 'id'> & { id: null };
