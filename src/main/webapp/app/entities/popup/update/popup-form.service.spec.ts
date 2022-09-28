import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../popup.test-samples';

import { PopupFormService } from './popup-form.service';

describe('Popup Form Service', () => {
  let service: PopupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupFormService);
  });

  describe('Service methods', () => {
    describe('createPopupFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPopupFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isImage: expect.any(Object),
            videoUrl: expect.any(Object),
            redirectUrl: expect.any(Object),
            attachment: expect.any(Object),
          })
        );
      });

      it('passing IPopup should create a new form with FormGroup', () => {
        const formGroup = service.createPopupFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isImage: expect.any(Object),
            videoUrl: expect.any(Object),
            redirectUrl: expect.any(Object),
            attachment: expect.any(Object),
          })
        );
      });
    });

    describe('getPopup', () => {
      it('should return NewPopup for default Popup initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPopupFormGroup(sampleWithNewData);

        const popup = service.getPopup(formGroup) as any;

        expect(popup).toMatchObject(sampleWithNewData);
      });

      it('should return NewPopup for empty Popup initial value', () => {
        const formGroup = service.createPopupFormGroup();

        const popup = service.getPopup(formGroup) as any;

        expect(popup).toMatchObject({});
      });

      it('should return IPopup', () => {
        const formGroup = service.createPopupFormGroup(sampleWithRequiredData);

        const popup = service.getPopup(formGroup) as any;

        expect(popup).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPopup should not enable id FormControl', () => {
        const formGroup = service.createPopupFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPopup should disable id FormControl', () => {
        const formGroup = service.createPopupFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
