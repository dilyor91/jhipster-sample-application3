import { IStudyAtKorea, NewStudyAtKorea } from './study-at-korea.model';

export const sampleWithRequiredData: IStudyAtKorea = {
  id: 14067,
};

export const sampleWithPartialData: IStudyAtKorea = {
  id: 11983,
  titleUz: 'orchid',
  titleRu: 'Response mobile',
  titleKr: 'Tala Micronesia SSL',
  contentRu: 'SQL Steel',
  contentKr: 'generate Functionality payment',
};

export const sampleWithFullData: IStudyAtKorea = {
  id: 95390,
  titleUz: 'Handmade Cross-group',
  titleRu: 'input',
  titleKr: 'Metal hacking withdrawal',
  contentUz: 'Market neutral Vanuatu',
  contentRu: 'copying',
  contentKr: 'Haven Jewelery',
};

export const sampleWithNewData: NewStudyAtKorea = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
