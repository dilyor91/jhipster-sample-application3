import { IAttachment, NewAttachment } from './attachment.model';

export const sampleWithRequiredData: IAttachment = {
  id: 43624,
};

export const sampleWithPartialData: IAttachment = {
  id: 9174,
  fileNameRu: 'Fords Practical Product',
  fileNameKr: 'Group Meadow Programmable',
  path: 'multi-tasking',
  originalFileName: 'Object-based Division Hat',
  fileSize: 50740,
  suffix: 'Paradigm',
  thumbnailFileName: 'optical auxiliary viral',
  bucketName: 'Computers CSS',
};

export const sampleWithFullData: IAttachment = {
  id: 59380,
  fileNameUz: 'Enterprise-wide',
  fileNameRu: 'RSS bluetooth purple',
  fileNameKr: 'SSL whiteboard',
  path: 'wireless Factors',
  originalFileName: 'Central',
  contentType: 'motivating Avon',
  fileSize: 22074,
  suffix: 'Internal',
  thumbnailFileName: 'Mandatory Towels',
  bucketName: 'Dakota Nebraska',
};

export const sampleWithNewData: NewAttachment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
