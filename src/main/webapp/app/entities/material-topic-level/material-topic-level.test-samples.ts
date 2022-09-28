import { IMaterialTopicLevel, NewMaterialTopicLevel } from './material-topic-level.model';

export const sampleWithRequiredData: IMaterialTopicLevel = {
  id: 63359,
};

export const sampleWithPartialData: IMaterialTopicLevel = {
  id: 1220,
  titleKr: 'array eyeballs',
};

export const sampleWithFullData: IMaterialTopicLevel = {
  id: 73521,
  titleUz: 'Granite violet',
  titleRu: 'Salad Car',
  titleKr: 'RAM Wisconsin Berkshire',
};

export const sampleWithNewData: NewMaterialTopicLevel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
