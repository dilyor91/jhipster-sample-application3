import { IKoreanCulture, NewKoreanCulture } from './korean-culture.model';

export const sampleWithRequiredData: IKoreanCulture = {
  id: 11978,
};

export const sampleWithPartialData: IKoreanCulture = {
  id: 33062,
  titleKr: 'Djibouti',
  contentRu: 'quantify info-mediaries withdrawal',
  contentKr: 'Cambridgeshire',
};

export const sampleWithFullData: IKoreanCulture = {
  id: 22813,
  titleUz: 'Granite Director',
  titleRu: 'Designer dot-com',
  titleKr: 'Wells Dong compress',
  contentUz: 'infrastructure',
  contentRu: 'Tasty Fresh',
  contentKr: 'radical attitude Shoes',
};

export const sampleWithNewData: NewKoreanCulture = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
