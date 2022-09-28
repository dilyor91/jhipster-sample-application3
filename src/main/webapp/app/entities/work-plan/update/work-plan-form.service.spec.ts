import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../work-plan.test-samples';

import { WorkPlanFormService } from './work-plan-form.service';

describe('WorkPlan Form Service', () => {
  let service: WorkPlanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPlanFormService);
  });

  describe('Service methods', () => {
    describe('createWorkPlanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkPlanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            planType: expect.any(Object),
          })
        );
      });

      it('passing IWorkPlan should create a new form with FormGroup', () => {
        const formGroup = service.createWorkPlanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            planType: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkPlan', () => {
      it('should return NewWorkPlan for default WorkPlan initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkPlanFormGroup(sampleWithNewData);

        const workPlan = service.getWorkPlan(formGroup) as any;

        expect(workPlan).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkPlan for empty WorkPlan initial value', () => {
        const formGroup = service.createWorkPlanFormGroup();

        const workPlan = service.getWorkPlan(formGroup) as any;

        expect(workPlan).toMatchObject({});
      });

      it('should return IWorkPlan', () => {
        const formGroup = service.createWorkPlanFormGroup(sampleWithRequiredData);

        const workPlan = service.getWorkPlan(formGroup) as any;

        expect(workPlan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkPlan should not enable id FormControl', () => {
        const formGroup = service.createWorkPlanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkPlan should disable id FormControl', () => {
        const formGroup = service.createWorkPlanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
