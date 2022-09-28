import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';

export interface IMaterialTopic {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  materialTopicLevel?: Pick<IMaterialTopicLevel, 'id'> | null;
}

export type NewMaterialTopic = Omit<IMaterialTopic, 'id'> & { id: null };
