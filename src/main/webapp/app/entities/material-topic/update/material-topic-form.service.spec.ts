import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../material-topic.test-samples';

import { MaterialTopicFormService } from './material-topic-form.service';

describe('MaterialTopic Form Service', () => {
  let service: MaterialTopicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTopicFormService);
  });

  describe('Service methods', () => {
    describe('createMaterialTopicFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMaterialTopicFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            materialTopicLevel: expect.any(Object),
          })
        );
      });

      it('passing IMaterialTopic should create a new form with FormGroup', () => {
        const formGroup = service.createMaterialTopicFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            materialTopicLevel: expect.any(Object),
          })
        );
      });
    });

    describe('getMaterialTopic', () => {
      it('should return NewMaterialTopic for default MaterialTopic initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMaterialTopicFormGroup(sampleWithNewData);

        const materialTopic = service.getMaterialTopic(formGroup) as any;

        expect(materialTopic).toMatchObject(sampleWithNewData);
      });

      it('should return NewMaterialTopic for empty MaterialTopic initial value', () => {
        const formGroup = service.createMaterialTopicFormGroup();

        const materialTopic = service.getMaterialTopic(formGroup) as any;

        expect(materialTopic).toMatchObject({});
      });

      it('should return IMaterialTopic', () => {
        const formGroup = service.createMaterialTopicFormGroup(sampleWithRequiredData);

        const materialTopic = service.getMaterialTopic(formGroup) as any;

        expect(materialTopic).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMaterialTopic should not enable id FormControl', () => {
        const formGroup = service.createMaterialTopicFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMaterialTopic should disable id FormControl', () => {
        const formGroup = service.createMaterialTopicFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
