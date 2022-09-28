import { IGreeting, NewGreeting } from './greeting.model';

export const sampleWithRequiredData: IGreeting = {
  id: 73371,
};

export const sampleWithPartialData: IGreeting = {
  id: 2800,
  contentUz: 'SCSI',
  contentRu: 'Small',
  contentKr: 'Tennessee Personal',
};

export const sampleWithFullData: IGreeting = {
  id: 59074,
  contentUz: 'disintermediate',
  contentRu: 'Rupee Albania',
  contentKr: 'Steel open-source Ball',
};

export const sampleWithNewData: NewGreeting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
