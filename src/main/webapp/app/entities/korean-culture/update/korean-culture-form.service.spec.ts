import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../korean-culture.test-samples';

import { KoreanCultureFormService } from './korean-culture-form.service';

describe('KoreanCulture Form Service', () => {
  let service: KoreanCultureFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KoreanCultureFormService);
  });

  describe('Service methods', () => {
    describe('createKoreanCultureFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKoreanCultureFormGroup();

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

      it('passing IKoreanCulture should create a new form with FormGroup', () => {
        const formGroup = service.createKoreanCultureFormGroup(sampleWithRequiredData);

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

    describe('getKoreanCulture', () => {
      it('should return NewKoreanCulture for default KoreanCulture initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createKoreanCultureFormGroup(sampleWithNewData);

        const koreanCulture = service.getKoreanCulture(formGroup) as any;

        expect(koreanCulture).toMatchObject(sampleWithNewData);
      });

      it('should return NewKoreanCulture for empty KoreanCulture initial value', () => {
        const formGroup = service.createKoreanCultureFormGroup();

        const koreanCulture = service.getKoreanCulture(formGroup) as any;

        expect(koreanCulture).toMatchObject({});
      });

      it('should return IKoreanCulture', () => {
        const formGroup = service.createKoreanCultureFormGroup(sampleWithRequiredData);

        const koreanCulture = service.getKoreanCulture(formGroup) as any;

        expect(koreanCulture).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKoreanCulture should not enable id FormControl', () => {
        const formGroup = service.createKoreanCultureFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKoreanCulture should disable id FormControl', () => {
        const formGroup = service.createKoreanCultureFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
