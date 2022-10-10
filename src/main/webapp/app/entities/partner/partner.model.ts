import { IAttachment } from 'app/entities/attachment/attachment.model';

export interface IPartner {
  id: number;
  titleUz?: string | null;
  titleRu?: string | null;
  titleKr?: string | null;
  webUrl?: string | null;
  youtubeUrl?: string | null;
  attachment?: Pick<IAttachment, 'id'> | null;
}

export type NewPartner = Omit<IPartner, 'id'> & { id: null };
