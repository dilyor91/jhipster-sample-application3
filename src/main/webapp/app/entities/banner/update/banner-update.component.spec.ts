import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BannerFormService } from './banner-form.service';
import { BannerService } from '../service/banner.service';
import { IBanner } from '../banner.model';

import { BannerUpdateComponent } from './banner-update.component';

describe('Banner Management Update Component', () => {
  let comp: BannerUpdateComponent;
  let fixture: ComponentFixture<BannerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bannerFormService: BannerFormService;
  let bannerService: BannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BannerUpdateComponent],
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
      .overrideTemplate(BannerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BannerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bannerFormService = TestBed.inject(BannerFormService);
    bannerService = TestBed.inject(BannerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const banner: IBanner = { id: 456 };

      activatedRoute.data = of({ banner });
      comp.ngOnInit();

      expect(comp.banner).toEqual(banner);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanner>>();
      const banner = { id: 123 };
      jest.spyOn(bannerFormService, 'getBanner').mockReturnValue(banner);
      jest.spyOn(bannerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banner });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banner }));
      saveSubject.complete();

      // THEN
      expect(bannerFormService.getBanner).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bannerService.update).toHaveBeenCalledWith(expect.objectContaining(banner));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanner>>();
      const banner = { id: 123 };
      jest.spyOn(bannerFormService, 'getBanner').mockReturnValue({ id: null });
      jest.spyOn(bannerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banner: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banner }));
      saveSubject.complete();

      // THEN
      expect(bannerFormService.getBanner).toHaveBeenCalled();
      expect(bannerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanner>>();
      const banner = { id: 123 };
      jest.spyOn(bannerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banner });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bannerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
