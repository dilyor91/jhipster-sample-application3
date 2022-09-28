import { IImage, NewImage } from './image.model';

export const sampleWithRequiredData: IImage = {
  id: 41829,
};

export const sampleWithPartialData: IImage = {
  id: 84334,
  imageData: 'driver Toys value-added',
  mainlyPhoto: true,
};

export const sampleWithFullData: IImage = {
  id: 76402,
  orginalName: 'Ergonomic array',
  name: 'TCP',
  imageData: 'Research Applications',
  mainlyPhoto: false,
};

export const sampleWithNewData: NewImage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
