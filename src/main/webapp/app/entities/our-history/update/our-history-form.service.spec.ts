import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../our-history.test-samples';

import { OurHistoryFormService } from './our-history-form.service';

describe('OurHistory Form Service', () => {
  let service: OurHistoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurHistoryFormService);
  });

  describe('Service methods', () => {
    describe('createOurHistoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOurHistoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            postedDate: expect.any(Object),
          })
        );
      });

      it('passing IOurHistory should create a new form with FormGroup', () => {
        const formGroup = service.createOurHistoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            postedDate: expect.any(Object),
          })
        );
      });
    });

    describe('getOurHistory', () => {
      it('should return NewOurHistory for default OurHistory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createOurHistoryFormGroup(sampleWithNewData);

        const ourHistory = service.getOurHistory(formGroup) as any;

        expect(ourHistory).toMatchObject(sampleWithNewData);
      });

      it('should return NewOurHistory for empty OurHistory initial value', () => {
        const formGroup = service.createOurHistoryFormGroup();

        const ourHistory = service.getOurHistory(formGroup) as any;

        expect(ourHistory).toMatchObject({});
      });

      it('should return IOurHistory', () => {
        const formGroup = service.createOurHistoryFormGroup(sampleWithRequiredData);

        const ourHistory = service.getOurHistory(formGroup) as any;

        expect(ourHistory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOurHistory should not enable id FormControl', () => {
        const formGroup = service.createOurHistoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOurHistory should disable id FormControl', () => {
        const formGroup = service.createOurHistoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
