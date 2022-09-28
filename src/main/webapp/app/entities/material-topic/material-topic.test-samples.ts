import { IMaterialTopic, NewMaterialTopic } from './material-topic.model';

export const sampleWithRequiredData: IMaterialTopic = {
  id: 6277,
};

export const sampleWithPartialData: IMaterialTopic = {
  id: 30492,
  titleUz: 'Strategist',
  titleRu: 'Liaison',
  titleKr: 'Turnpike Home auxiliary',
};

export const sampleWithFullData: IMaterialTopic = {
  id: 81183,
  titleUz: 'Factors Beauty',
  titleRu: 'Account',
  titleKr: 'Chair Illinois',
};

export const sampleWithNewData: NewMaterialTopic = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
