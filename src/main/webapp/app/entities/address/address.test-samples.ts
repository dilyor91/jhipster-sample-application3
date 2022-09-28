import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 88754,
};

export const sampleWithPartialData: IAddress = {
  id: 68415,
  titleUz: 'Fresh Court',
  titleRu: 'Factors Hill Rubber',
  contentRu: 'navigating Cape Missouri',
  contentKr: 'Outdoors',
};

export const sampleWithFullData: IAddress = {
  id: 80702,
  titleUz: 'bottom-line',
  titleRu: 'hybrid',
  titleKr: 'Course Chair viral',
  contentUz: 'Account',
  contentRu: 'Incredible hack navigate',
  contentKr: 'Birr experiences Re-contextualized',
};

export const sampleWithNewData: NewAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
