import { IPartner, NewPartner } from './partner.model';

export const sampleWithRequiredData: IPartner = {
  id: 86899,
};

export const sampleWithPartialData: IPartner = {
  id: 70191,
  titleUz: 'Plaza cyan customized',
  titleKr: 'encompassing 1080p product',
};

export const sampleWithFullData: IPartner = {
  id: 38777,
  titleUz: 'Cross-group Cotton XSS',
  titleRu: 'connecting lavender',
  titleKr: 'Chair',
  webUrl: 'benchmark Cambridgeshire',
  youtubeUrl: 'invoice Books Shirt',
};

export const sampleWithNewData: NewPartner = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
