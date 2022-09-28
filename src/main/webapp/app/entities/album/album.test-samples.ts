import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  id: 51589,
};

export const sampleWithPartialData: IAlbum = {
  id: 98063,
  titleRu: 'Chips',
};

export const sampleWithFullData: IAlbum = {
  id: 81956,
  titleUz: 'client-server',
  titleRu: 'deliver value-added loyalty',
  titleKr: 'Corporate Shoes',
};

export const sampleWithNewData: NewAlbum = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
