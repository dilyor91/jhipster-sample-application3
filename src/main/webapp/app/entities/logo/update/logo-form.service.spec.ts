import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../logo.test-samples';

import { LogoFormService } from './logo-form.service';

describe('Logo Form Service', () => {
  let service: LogoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoFormService);
  });

  describe('Service methods', () => {
    describe('createLogoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            logoData: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing ILogo should create a new form with FormGroup', () => {
        const formGroup = service.createLogoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            logoData: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getLogo', () => {
      it('should return NewLogo for default Logo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLogoFormGroup(sampleWithNewData);

        const logo = service.getLogo(formGroup) as any;

        expect(logo).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogo for empty Logo initial value', () => {
        const formGroup = service.createLogoFormGroup();

        const logo = service.getLogo(formGroup) as any;

        expect(logo).toMatchObject({});
      });

      it('should return ILogo', () => {
        const formGroup = service.createLogoFormGroup(sampleWithRequiredData);

        const logo = service.getLogo(formGroup) as any;

        expect(logo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogo should not enable id FormControl', () => {
        const formGroup = service.createLogoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogo should disable id FormControl', () => {
        const formGroup = service.createLogoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
