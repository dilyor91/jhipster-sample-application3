import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { KoreanCultureFormService } from './korean-culture-form.service';
import { KoreanCultureService } from '../service/korean-culture.service';
import { IKoreanCulture } from '../korean-culture.model';

import { KoreanCultureUpdateComponent } from './korean-culture-update.component';

describe('KoreanCulture Management Update Component', () => {
  let comp: KoreanCultureUpdateComponent;
  let fixture: ComponentFixture<KoreanCultureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let koreanCultureFormService: KoreanCultureFormService;
  let koreanCultureService: KoreanCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [KoreanCultureUpdateComponent],
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
      .overrideTemplate(KoreanCultureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KoreanCultureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    koreanCultureFormService = TestBed.inject(KoreanCultureFormService);
    koreanCultureService = TestBed.inject(KoreanCultureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const koreanCulture: IKoreanCulture = { id: 456 };

      activatedRoute.data = of({ koreanCulture });
      comp.ngOnInit();

      expect(comp.koreanCulture).toEqual(koreanCulture);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKoreanCulture>>();
      const koreanCulture = { id: 123 };
      jest.spyOn(koreanCultureFormService, 'getKoreanCulture').mockReturnValue(koreanCulture);
      jest.spyOn(koreanCultureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ koreanCulture });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: koreanCulture }));
      saveSubject.complete();

      // THEN
      expect(koreanCultureFormService.getKoreanCulture).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(koreanCultureService.update).toHaveBeenCalledWith(expect.objectContaining(koreanCulture));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKoreanCulture>>();
      const koreanCulture = { id: 123 };
      jest.spyOn(koreanCultureFormService, 'getKoreanCulture').mockReturnValue({ id: null });
      jest.spyOn(koreanCultureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ koreanCulture: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: koreanCulture }));
      saveSubject.complete();

      // THEN
      expect(koreanCultureFormService.getKoreanCulture).toHaveBeenCalled();
      expect(koreanCultureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKoreanCulture>>();
      const koreanCulture = { id: 123 };
      jest.spyOn(koreanCultureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ koreanCulture });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(koreanCultureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
