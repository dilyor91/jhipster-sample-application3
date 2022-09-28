import { ICenterStructure, NewCenterStructure } from './center-structure.model';

export const sampleWithRequiredData: ICenterStructure = {
  id: 56811,
};

export const sampleWithPartialData: ICenterStructure = {
  id: 28942,
  contentRu: 'unleash',
  contentKr: 'Card Bedfordshire Shoes',
};

export const sampleWithFullData: ICenterStructure = {
  id: 63367,
  contentUz: 'portal Legacy recontextualize',
  contentRu: 'whiteboard',
  contentKr: 'Wooden Arkansas',
};

export const sampleWithNewData: NewCenterStructure = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
