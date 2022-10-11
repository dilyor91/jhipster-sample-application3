import { IKoreanCulture } from 'app/entities/korean-culture/korean-culture.model';

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
  koreanCulture?: Pick<IKoreanCulture, 'id'> | null;
}

export type NewAttachment = Omit<IAttachment, 'id'> & { id: null };
