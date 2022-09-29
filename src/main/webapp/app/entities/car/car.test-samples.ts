import { ICar, NewCar } from './car.model';

export const sampleWithRequiredData: ICar = {
  id: 96848,
};

export const sampleWithPartialData: ICar = {
  id: 56472,
  name: 'National',
};

export const sampleWithFullData: ICar = {
  id: 61549,
  name: 'Program Investor',
  color: 'orange',
};

export const sampleWithNewData: NewCar = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
