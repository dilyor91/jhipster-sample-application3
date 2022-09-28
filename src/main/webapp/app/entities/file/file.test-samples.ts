import { FileEntity } from 'app/entities/enumerations/file-entity.model';

import { IFile, NewFile } from './file.model';

export const sampleWithRequiredData: IFile = {
  id: 35927,
};

export const sampleWithPartialData: IFile = {
  id: 41025,
  fileSize: 69331,
};

export const sampleWithFullData: IFile = {
  id: 32217,
  orginalName: 'parse exploit',
  fileName: 'Chicken',
  fileSize: 54614,
  fileFormat: 'Loan',
  filePath: 'SMTP Account',
  fileEntity: FileEntity['STUDYATKOREA'],
};

export const sampleWithNewData: NewFile = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
