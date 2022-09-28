import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AnswerAndQuestionFormService } from './answer-and-question-form.service';
import { AnswerAndQuestionService } from '../service/answer-and-question.service';
import { IAnswerAndQuestion } from '../answer-and-question.model';

import { AnswerAndQuestionUpdateComponent } from './answer-and-question-update.component';

describe('AnswerAndQuestion Management Update Component', () => {
  let comp: AnswerAndQuestionUpdateComponent;
  let fixture: ComponentFixture<AnswerAndQuestionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let answerAndQuestionFormService: AnswerAndQuestionFormService;
  let answerAndQuestionService: AnswerAndQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AnswerAndQuestionUpdateComponent],
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
      .overrideTemplate(AnswerAndQuestionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnswerAndQuestionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    answerAndQuestionFormService = TestBed.inject(AnswerAndQuestionFormService);
    answerAndQuestionService = TestBed.inject(AnswerAndQuestionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const answerAndQuestion: IAnswerAndQuestion = { id: 456 };

      activatedRoute.data = of({ answerAndQuestion });
      comp.ngOnInit();

      expect(comp.answerAndQuestion).toEqual(answerAndQuestion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnswerAndQuestion>>();
      const answerAndQuestion = { id: 123 };
      jest.spyOn(answerAndQuestionFormService, 'getAnswerAndQuestion').mockReturnValue(answerAndQuestion);
      jest.spyOn(answerAndQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ answerAndQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: answerAndQuestion }));
      saveSubject.complete();

      // THEN
      expect(answerAndQuestionFormService.getAnswerAndQuestion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(answerAndQuestionService.update).toHaveBeenCalledWith(expect.objectContaining(answerAndQuestion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnswerAndQuestion>>();
      const answerAndQuestion = { id: 123 };
      jest.spyOn(answerAndQuestionFormService, 'getAnswerAndQuestion').mockReturnValue({ id: null });
      jest.spyOn(answerAndQuestionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ answerAndQuestion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: answerAndQuestion }));
      saveSubject.complete();

      // THEN
      expect(answerAndQuestionFormService.getAnswerAndQuestion).toHaveBeenCalled();
      expect(answerAndQuestionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnswerAndQuestion>>();
      const answerAndQuestion = { id: 123 };
      jest.spyOn(answerAndQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ answerAndQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(answerAndQuestionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
