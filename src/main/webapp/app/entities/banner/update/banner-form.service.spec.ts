import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../banner.test-samples';

import { BannerFormService } from './banner-form.service';

describe('Banner Form Service', () => {
  let service: BannerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerFormService);
  });

  describe('Service methods', () => {
    describe('createBannerFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBannerFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bannerData: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing IBanner should create a new form with FormGroup', () => {
        const formGroup = service.createBannerFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            bannerData: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getBanner', () => {
      it('should return NewBanner for default Banner initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBannerFormGroup(sampleWithNewData);

        const banner = service.getBanner(formGroup) as any;

        expect(banner).toMatchObject(sampleWithNewData);
      });

      it('should return NewBanner for empty Banner initial value', () => {
        const formGroup = service.createBannerFormGroup();

        const banner = service.getBanner(formGroup) as any;

        expect(banner).toMatchObject({});
      });

      it('should return IBanner', () => {
        const formGroup = service.createBannerFormGroup(sampleWithRequiredData);

        const banner = service.getBanner(formGroup) as any;

        expect(banner).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBanner should not enable id FormControl', () => {
        const formGroup = service.createBannerFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBanner should disable id FormControl', () => {
        const formGroup = service.createBannerFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
