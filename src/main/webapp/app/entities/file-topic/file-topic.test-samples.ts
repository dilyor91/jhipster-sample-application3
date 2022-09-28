import { IFileTopic, NewFileTopic } from './file-topic.model';

export const sampleWithRequiredData: IFileTopic = {
  id: 54594,
};

export const sampleWithPartialData: IFileTopic = {
  id: 24997,
  fileOrginalName: 'HDD open-source Account',
  fileNameUz: 'Frozen',
  fileType: 'encompassing',
};

export const sampleWithFullData: IFileTopic = {
  id: 1030,
  fileOrginalName: 'tan Garden Peso',
  fileNameUz: 'Leu',
  fileNameRu: 'Agent AI navigating',
  fileNameKr: 'repurpose',
  fileType: 'Namibia Sleek Massachusetts',
  fileSize: 69974,
  filePath: 'maximize Licensed',
};

export const sampleWithNewData: NewFileTopic = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
