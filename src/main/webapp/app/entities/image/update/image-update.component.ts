import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ImageFormService, ImageFormGroup } from './image-form.service';
import { IImage } from '../image.model';
import { ImageService } from '../service/image.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html',
})
export class ImageUpdateComponent implements OnInit {
  isSaving = false;
  image: IImage | null = null;

  albumsSharedCollection: IAlbum[] = [];

  editForm: ImageFormGroup = this.imageFormService.createImageFormGroup();

  constructor(
    protected imageService: ImageService,
    protected imageFormService: ImageFormService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAlbum = (o1: IAlbum | null, o2: IAlbum | null): boolean => this.albumService.compareAlbum(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
      if (image) {
        this.updateForm(image);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const image = this.imageFormService.getImage(this.editForm);
    if (image.id !== null) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(image: IImage): void {
    this.image = image;
    this.imageFormService.resetForm(this.editForm, image);

    this.albumsSharedCollection = this.albumService.addAlbumToCollectionIfMissing<IAlbum>(this.albumsSharedCollection, image.image);
  }

  protected loadRelationshipsOptions(): void {
    this.albumService
      .query()
      .pipe(map((res: HttpResponse<IAlbum[]>) => res.body ?? []))
      .pipe(map((albums: IAlbum[]) => this.albumService.addAlbumToCollectionIfMissing<IAlbum>(albums, this.image?.image)))
      .subscribe((albums: IAlbum[]) => (this.albumsSharedCollection = albums));
  }
}
