import { IPopup, NewPopup } from './popup.model';

export const sampleWithRequiredData: IPopup = {
  id: 91069,
};

export const sampleWithPartialData: IPopup = {
  id: 55479,
  isImage: true,
  videoUrl: 'open',
};

export const sampleWithFullData: IPopup = {
  id: 51060,
  isImage: true,
  videoUrl: 'content Lead',
  redirectUrl: 'Granite',
};

export const sampleWithNewData: NewPopup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
