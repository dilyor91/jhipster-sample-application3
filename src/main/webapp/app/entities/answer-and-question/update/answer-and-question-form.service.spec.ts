import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../answer-and-question.test-samples';

import { AnswerAndQuestionFormService } from './answer-and-question-form.service';

describe('AnswerAndQuestion Form Service', () => {
  let service: AnswerAndQuestionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerAndQuestionFormService);
  });

  describe('Service methods', () => {
    describe('createAnswerAndQuestionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            questionUz: expect.any(Object),
            questionRu: expect.any(Object),
            questionKr: expect.any(Object),
            answerUz: expect.any(Object),
            answerRu: expect.any(Object),
            answerKr: expect.any(Object),
          })
        );
      });

      it('passing IAnswerAndQuestion should create a new form with FormGroup', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            questionUz: expect.any(Object),
            questionRu: expect.any(Object),
            questionKr: expect.any(Object),
            answerUz: expect.any(Object),
            answerRu: expect.any(Object),
            answerKr: expect.any(Object),
          })
        );
      });
    });

    describe('getAnswerAndQuestion', () => {
      it('should return NewAnswerAndQuestion for default AnswerAndQuestion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAnswerAndQuestionFormGroup(sampleWithNewData);

        const answerAndQuestion = service.getAnswerAndQuestion(formGroup) as any;

        expect(answerAndQuestion).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnswerAndQuestion for empty AnswerAndQuestion initial value', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup();

        const answerAndQuestion = service.getAnswerAndQuestion(formGroup) as any;

        expect(answerAndQuestion).toMatchObject({});
      });

      it('should return IAnswerAndQuestion', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup(sampleWithRequiredData);

        const answerAndQuestion = service.getAnswerAndQuestion(formGroup) as any;

        expect(answerAndQuestion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnswerAndQuestion should not enable id FormControl', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnswerAndQuestion should disable id FormControl', () => {
        const formGroup = service.createAnswerAndQuestionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
