import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../center-structure.test-samples';

import { CenterStructureFormService } from './center-structure-form.service';

describe('CenterStructure Form Service', () => {
  let service: CenterStructureFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterStructureFormService);
  });

  describe('Service methods', () => {
    describe('createCenterStructureFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCenterStructureFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
          })
        );
      });

      it('passing ICenterStructure should create a new form with FormGroup', () => {
        const formGroup = service.createCenterStructureFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
          })
        );
      });
    });

    describe('getCenterStructure', () => {
      it('should return NewCenterStructure for default CenterStructure initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCenterStructureFormGroup(sampleWithNewData);

        const centerStructure = service.getCenterStructure(formGroup) as any;

        expect(centerStructure).toMatchObject(sampleWithNewData);
      });

      it('should return NewCenterStructure for empty CenterStructure initial value', () => {
        const formGroup = service.createCenterStructureFormGroup();

        const centerStructure = service.getCenterStructure(formGroup) as any;

        expect(centerStructure).toMatchObject({});
      });

      it('should return ICenterStructure', () => {
        const formGroup = service.createCenterStructureFormGroup(sampleWithRequiredData);

        const centerStructure = service.getCenterStructure(formGroup) as any;

        expect(centerStructure).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICenterStructure should not enable id FormControl', () => {
        const formGroup = service.createCenterStructureFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCenterStructure should disable id FormControl', () => {
        const formGroup = service.createCenterStructureFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
