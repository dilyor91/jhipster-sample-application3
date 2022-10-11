import { KoreanCultureType } from 'app/entities/enumerations/korean-culture-type.model';

import { IKoreanCulture, NewKoreanCulture } from './korean-culture.model';

export const sampleWithRequiredData: IKoreanCulture = {
  id: 11978,
};

export const sampleWithPartialData: IKoreanCulture = {
  id: 26795,
  titleKr: 'Down-sized quantify',
  contentRu: 'Hill',
  contentKr: 'override Factors',
};

export const sampleWithFullData: IKoreanCulture = {
  id: 61457,
  titleUz: 'firewall',
  titleRu: 'Director Walk',
  titleKr: 'dot-com District national',
  contentUz: 'compress extranet navigate',
  contentRu: 'transition Fresh Product',
  contentKr: 'attitude Shoes',
  koreanCultureTYpe: KoreanCultureType['INTRODUCE_KOREAN_CULTURE'],
};

export const sampleWithNewData: NewKoreanCulture = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
