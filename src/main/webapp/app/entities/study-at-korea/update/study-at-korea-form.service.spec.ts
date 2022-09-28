import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../study-at-korea.test-samples';

import { StudyAtKoreaFormService } from './study-at-korea-form.service';

describe('StudyAtKorea Form Service', () => {
  let service: StudyAtKoreaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyAtKoreaFormService);
  });

  describe('Service methods', () => {
    describe('createStudyAtKoreaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudyAtKoreaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
          })
        );
      });

      it('passing IStudyAtKorea should create a new form with FormGroup', () => {
        const formGroup = service.createStudyAtKoreaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
          })
        );
      });
    });

    describe('getStudyAtKorea', () => {
      it('should return NewStudyAtKorea for default StudyAtKorea initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStudyAtKoreaFormGroup(sampleWithNewData);

        const studyAtKorea = service.getStudyAtKorea(formGroup) as any;

        expect(studyAtKorea).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudyAtKorea for empty StudyAtKorea initial value', () => {
        const formGroup = service.createStudyAtKoreaFormGroup();

        const studyAtKorea = service.getStudyAtKorea(formGroup) as any;

        expect(studyAtKorea).toMatchObject({});
      });

      it('should return IStudyAtKorea', () => {
        const formGroup = service.createStudyAtKoreaFormGroup(sampleWithRequiredData);

        const studyAtKorea = service.getStudyAtKorea(formGroup) as any;

        expect(studyAtKorea).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudyAtKorea should not enable id FormControl', () => {
        const formGroup = service.createStudyAtKoreaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudyAtKorea should disable id FormControl', () => {
        const formGroup = service.createStudyAtKoreaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
