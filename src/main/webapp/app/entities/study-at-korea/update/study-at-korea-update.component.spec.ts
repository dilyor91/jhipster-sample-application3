import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StudyAtKoreaFormService } from './study-at-korea-form.service';
import { StudyAtKoreaService } from '../service/study-at-korea.service';
import { IStudyAtKorea } from '../study-at-korea.model';

import { StudyAtKoreaUpdateComponent } from './study-at-korea-update.component';

describe('StudyAtKorea Management Update Component', () => {
  let comp: StudyAtKoreaUpdateComponent;
  let fixture: ComponentFixture<StudyAtKoreaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studyAtKoreaFormService: StudyAtKoreaFormService;
  let studyAtKoreaService: StudyAtKoreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StudyAtKoreaUpdateComponent],
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
      .overrideTemplate(StudyAtKoreaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudyAtKoreaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studyAtKoreaFormService = TestBed.inject(StudyAtKoreaFormService);
    studyAtKoreaService = TestBed.inject(StudyAtKoreaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const studyAtKorea: IStudyAtKorea = { id: 456 };

      activatedRoute.data = of({ studyAtKorea });
      comp.ngOnInit();

      expect(comp.studyAtKorea).toEqual(studyAtKorea);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAtKorea>>();
      const studyAtKorea = { id: 123 };
      jest.spyOn(studyAtKoreaFormService, 'getStudyAtKorea').mockReturnValue(studyAtKorea);
      jest.spyOn(studyAtKoreaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAtKorea });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyAtKorea }));
      saveSubject.complete();

      // THEN
      expect(studyAtKoreaFormService.getStudyAtKorea).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studyAtKoreaService.update).toHaveBeenCalledWith(expect.objectContaining(studyAtKorea));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAtKorea>>();
      const studyAtKorea = { id: 123 };
      jest.spyOn(studyAtKoreaFormService, 'getStudyAtKorea').mockReturnValue({ id: null });
      jest.spyOn(studyAtKoreaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAtKorea: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyAtKorea }));
      saveSubject.complete();

      // THEN
      expect(studyAtKoreaFormService.getStudyAtKorea).toHaveBeenCalled();
      expect(studyAtKoreaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAtKorea>>();
      const studyAtKorea = { id: 123 };
      jest.spyOn(studyAtKoreaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAtKorea });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studyAtKoreaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
