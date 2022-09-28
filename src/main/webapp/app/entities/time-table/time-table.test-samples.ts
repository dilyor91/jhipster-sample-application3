import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 45123,
};

export const sampleWithPartialData: ITimeTable = {
  id: 17585,
  titleUz: 'SMS HDD Accountability',
  contentRu: 'Engineer Handmade',
  postedDate: dayjs('2022-09-27'),
};

export const sampleWithFullData: ITimeTable = {
  id: 27792,
  titleUz: 'product Belgium Open-source',
  titleRu: 'Ohio Fresh',
  titleKr: 'transmitting disintermediate morph',
  contentUz: 'capacitor',
  contentRu: 'Extension firewall',
  contentKr: 'Frozen',
  postedDate: dayjs('2022-09-27'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
