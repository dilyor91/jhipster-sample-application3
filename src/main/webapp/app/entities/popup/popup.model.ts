import { IAttachment } from 'app/entities/attachment/attachment.model';

export interface IPopup {
  id: number;
  isImage?: boolean | null;
  videoUrl?: string | null;
  redirectUrl?: string | null;
  attachment?: Pick<IAttachment, 'id'> | null;
}

export type NewPopup = Omit<IPopup, 'id'> & { id: null };
