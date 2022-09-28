import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../greeting.test-samples';

import { GreetingFormService } from './greeting-form.service';

describe('Greeting Form Service', () => {
  let service: GreetingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingFormService);
  });

  describe('Service methods', () => {
    describe('createGreetingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGreetingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contentUz: expect.any(Object),
            contentRu: expect.any(Object),
            contentKr: expect.any(Object),
          })
        );
      });

      it('passing IGreeting should create a new form with FormGroup', () => {
        const formGroup = service.createGreetingFormGroup(sampleWithRequiredData);

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

    describe('getGreeting', () => {
      it('should return NewGreeting for default Greeting initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGreetingFormGroup(sampleWithNewData);

        const greeting = service.getGreeting(formGroup) as any;

        expect(greeting).toMatchObject(sampleWithNewData);
      });

      it('should return NewGreeting for empty Greeting initial value', () => {
        const formGroup = service.createGreetingFormGroup();

        const greeting = service.getGreeting(formGroup) as any;

        expect(greeting).toMatchObject({});
      });

      it('should return IGreeting', () => {
        const formGroup = service.createGreetingFormGroup(sampleWithRequiredData);

        const greeting = service.getGreeting(formGroup) as any;

        expect(greeting).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGreeting should not enable id FormControl', () => {
        const formGroup = service.createGreetingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGreeting should disable id FormControl', () => {
        const formGroup = service.createGreetingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
