import { IAlbum } from 'app/entities/album/album.model';

export interface IImage {
  id: number;
  orginalName?: string | null;
  name?: string | null;
  imageData?: string | null;
  mainlyPhoto?: boolean | null;
  image?: Pick<IAlbum, 'id'> | null;
}

export type NewImage = Omit<IImage, 'id'> & { id: null };
