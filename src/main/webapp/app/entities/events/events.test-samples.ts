import dayjs from 'dayjs/esm';

import { IEvents, NewEvents } from './events.model';

export const sampleWithRequiredData: IEvents = {
  id: 89576,
};

export const sampleWithPartialData: IEvents = {
  id: 52441,
  titleRu: 'capacitor Cotton magenta',
  contentRu: 'Fresh Shirt',
  postedDate: dayjs('2022-09-27'),
};

export const sampleWithFullData: IEvents = {
  id: 63104,
  titleUz: 'Technician Generic',
  titleRu: 'Berkshire experiences CSS',
  titleKr: 'Metal Michigan',
  contentUz: 'generate',
  contentRu: 'monetize deploy',
  contentKr: 'invoice Avon',
  postedDate: dayjs('2022-09-27'),
  status: false,
};

export const sampleWithNewData: NewEvents = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
