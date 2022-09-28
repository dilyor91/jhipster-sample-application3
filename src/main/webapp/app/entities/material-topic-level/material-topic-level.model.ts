export interface IMaterialTopicLevel {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
}

export type NewMaterialTopicLevel = Omit<IMaterialTopicLevel, 'id'> & { id: null };
