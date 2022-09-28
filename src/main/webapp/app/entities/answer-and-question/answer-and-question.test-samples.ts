import { IAnswerAndQuestion, NewAnswerAndQuestion } from './answer-and-question.model';

export const sampleWithRequiredData: IAnswerAndQuestion = {
  id: 94608,
};

export const sampleWithPartialData: IAnswerAndQuestion = {
  id: 59581,
  questionRu: 'Terrace',
  questionKr: 'Health Concrete Account',
  answerRu: 'Drive application',
};

export const sampleWithFullData: IAnswerAndQuestion = {
  id: 2278,
  questionUz: 'Object-based connecting Plains',
  questionRu: 'panel of moderator',
  questionKr: 'Tools exploit Bedfordshire',
  answerUz: 'port Internal Hawaii',
  answerRu: 'Intranet Kentucky Shoes',
  answerKr: 'distributed Kina orchid',
};

export const sampleWithNewData: NewAnswerAndQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
