import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../time-table.test-samples';

import { TimeTableFormService } from './time-table-form.service';

describe('TimeTable Form Service', () => {
  let service: TimeTableFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableFormService);
  });

  describe('Service methods', () => {
    describe('createTimeTableFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTimeTableFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            postedDate: expect.any(Object),
          })
        );
      });

      it('passing ITimeTable should create a new form with FormGroup', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            titleUz: expect.any(Object),
            titleRu: expect.any(Object),
            titleKr: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
            postedDate: expect.any(Object),
          })
        );
      });
    });

    describe('getTimeTable', () => {
      it('should return NewTimeTable for default TimeTable initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTimeTableFormGroup(sampleWithNewData);

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject(sampleWithNewData);
      });

      it('should return NewTimeTable for empty TimeTable initial value', () => {
        const formGroup = service.createTimeTableFormGroup();

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject({});
      });

      it('should return ITimeTable', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITimeTable should not enable id FormControl', () => {
        const formGroup = service.createTimeTableFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTimeTable should disable id FormControl', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
