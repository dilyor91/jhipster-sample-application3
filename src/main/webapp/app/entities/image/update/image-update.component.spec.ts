import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ImageFormService } from './image-form.service';
import { ImageService } from '../service/image.service';
import { IImage } from '../image.model';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

import { ImageUpdateComponent } from './image-update.component';

describe('Image Management Update Component', () => {
  let comp: ImageUpdateComponent;
  let fixture: ComponentFixture<ImageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let imageFormService: ImageFormService;
  let imageService: ImageService;
  let albumService: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ImageUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ImageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ImageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    imageFormService = TestBed.inject(ImageFormService);
    imageService = TestBed.inject(ImageService);
    albumService = TestBed.inject(AlbumService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Album query and add missing value', () => {
      const image: IImage = { id: 456 };
      const image: IAlbum = { id: 52732 };
      image.image = image;

      const albumCollection: IAlbum[] = [{ id: 20127 }];
      jest.spyOn(albumService, 'query').mockReturnValue(of(new HttpResponse({ body: albumCollection })));
      const additionalAlbums = [image];
      const expectedCollection: IAlbum[] = [...additionalAlbums, ...albumCollection];
      jest.spyOn(albumService, 'addAlbumToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ image });
      comp.ngOnInit();

      expect(albumService.query).toHaveBeenCalled();
      expect(albumService.addAlbumToCollectionIfMissing).toHaveBeenCalledWith(
        albumCollection,
        ...additionalAlbums.map(expect.objectContaining)
      );
      expect(comp.albumsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const image: IImage = { id: 456 };
      const image: IAlbum = { id: 45938 };
      image.image = image;

      activatedRoute.data = of({ image });
      comp.ngOnInit();

      expect(comp.albumsSharedCollection).toContain(image);
      expect(comp.image).toEqual(image);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImage>>();
      const image = { id: 123 };
      jest.spyOn(imageFormService, 'getImage').mockReturnValue(image);
      jest.spyOn(imageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ image });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: image }));
      saveSubject.complete();

      // THEN
      expect(imageFormService.getImage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(imageService.update).toHaveBeenCalledWith(expect.objectContaining(image));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImage>>();
      const image = { id: 123 };
      jest.spyOn(imageFormService, 'getImage').mockReturnValue({ id: null });
      jest.spyOn(imageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ image: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: image }));
      saveSubject.complete();

      // THEN
      expect(imageFormService.getImage).toHaveBeenCalled();
      expect(imageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IImage>>();
      const image = { id: 123 };
      jest.spyOn(imageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ image });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(imageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAlbum', () => {
      it('Should forward to albumService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(albumService, 'compareAlbum');
        comp.compareAlbum(entity, entity2);
        expect(albumService.compareAlbum).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
