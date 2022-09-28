export interface IAttachment {
  id: number;
  fileNameUz?: string | null;
  fileNameRu?: string | null;
  fileNameKr?: string | null;
  path?: string | null;
  originalFileName?: string | null;
  contentType?: string | null;
  fileSize?: number | null;
  suffix?: string | null;
  thumbnailFileName?: string | null;
  bucketName?: string | null;
}

export type NewAttachment = Omit<IAttachment, 'id'> & { id: null };
