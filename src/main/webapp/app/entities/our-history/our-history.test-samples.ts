import dayjs from 'dayjs/esm';

import { IOurHistory, NewOurHistory } from './our-history.model';

export const sampleWithRequiredData: IOurHistory = {
  id: 34077,
};

export const sampleWithPartialData: IOurHistory = {
  id: 89102,
  contentRu: 'Facilitator Home Movies',
};

export const sampleWithFullData: IOurHistory = {
  id: 39403,
  contentUz: 'Industrial',
  contentRu: 'Optimized',
  contentKr: 'SCSI Fantastic',
  postedDate: dayjs('2022-09-28'),
};

export const sampleWithNewData: NewOurHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
