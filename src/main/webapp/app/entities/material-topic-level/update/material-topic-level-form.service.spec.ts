import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../material-topic-level.test-samples';

import { MaterialTopicLevelFormService } from './material-topic-level-form.service';

describe('MaterialTopicLevel Form Service', () => {
  let service: MaterialTopicLevelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTopicLevelFormService);
  });

  describe('Service methods', () => {
    describe('createMaterialTopicLevelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
          })
        );
      });

      it('passing IMaterialTopicLevel should create a new form with FormGroup', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
          })
        );
      });
    });

    describe('getMaterialTopicLevel', () => {
      it('should return NewMaterialTopicLevel for default MaterialTopicLevel initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMaterialTopicLevelFormGroup(sampleWithNewData);

        const materialTopicLevel = service.getMaterialTopicLevel(formGroup) as any;

        expect(materialTopicLevel).toMatchObject(sampleWithNewData);
      });

      it('should return NewMaterialTopicLevel for empty MaterialTopicLevel initial value', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup();

        const materialTopicLevel = service.getMaterialTopicLevel(formGroup) as any;

        expect(materialTopicLevel).toMatchObject({});
      });

      it('should return IMaterialTopicLevel', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup(sampleWithRequiredData);

        const materialTopicLevel = service.getMaterialTopicLevel(formGroup) as any;

        expect(materialTopicLevel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMaterialTopicLevel should not enable id FormControl', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMaterialTopicLevel should disable id FormControl', () => {
        const formGroup = service.createMaterialTopicLevelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
