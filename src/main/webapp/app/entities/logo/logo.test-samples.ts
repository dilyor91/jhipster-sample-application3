import { ILogo, NewLogo } from './logo.model';

export const sampleWithRequiredData: ILogo = {
  id: 91010,
};

export const sampleWithPartialData: ILogo = {
  id: 45253,
  name: 'compressing Web Cambridgeshire',
  logoData: 'Multi-layered',
};

export const sampleWithFullData: ILogo = {
  id: 51685,
  name: 'quantifying mint Unbranded',
  logoData: 'Springs alarm circuit',
  status: true,
};

export const sampleWithNewData: NewLogo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
