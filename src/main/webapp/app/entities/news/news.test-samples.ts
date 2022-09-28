import dayjs from 'dayjs/esm';

import { INews, NewNews } from './news.model';

export const sampleWithRequiredData: INews = {
  id: 76512,
};

export const sampleWithPartialData: INews = {
  id: 35492,
  titleUz: 'wireless',
  contentKr: 'Usability Data B2C',
  status: false,
};

export const sampleWithFullData: INews = {
  id: 78273,
  titleUz: 'Incredible',
  titleRu: 'architectures white',
  titleKr: '24/7 bleeding-edge',
  contentUz: 'Internal',
  contentRu: 'Cross-platform Convertible',
  contentKr: 'District Creative',
  postedDate: dayjs('2022-09-28'),
  status: true,
};

export const sampleWithNewData: NewNews = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
