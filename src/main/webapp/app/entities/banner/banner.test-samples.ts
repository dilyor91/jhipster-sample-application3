import { IBanner, NewBanner } from './banner.model';

export const sampleWithRequiredData: IBanner = {
  id: 74804,
};

export const sampleWithPartialData: IBanner = {
  id: 17906,
  status: true,
};

export const sampleWithFullData: IBanner = {
  id: 39116,
  name: 'Rial extranet Gorgeous',
  bannerData: 'invoice systems',
  status: true,
};

export const sampleWithNewData: NewBanner = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
