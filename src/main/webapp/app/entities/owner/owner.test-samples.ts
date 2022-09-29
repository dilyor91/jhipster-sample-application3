import { IOwner, NewOwner } from './owner.model';

export const sampleWithRequiredData: IOwner = {
  id: 70414,
};

export const sampleWithPartialData: IOwner = {
  id: 39523,
  name: 'array mesh',
};

export const sampleWithFullData: IOwner = {
  id: 31075,
  name: 'Granite info-mediaries Chair',
  family: 'Checking',
};

export const sampleWithNewData: NewOwner = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
