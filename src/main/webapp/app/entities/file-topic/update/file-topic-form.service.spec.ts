import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../file-topic.test-samples';

import { FileTopicFormService } from './file-topic-form.service';

describe('FileTopic Form Service', () => {
  let service: FileTopicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileTopicFormService);
  });

  describe('Service methods', () => {
    describe('createFileTopicFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFileTopicFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileOrginalName: expect.any(Object),
            fileNameUz: expect.any(Object),
            fileNameRu: expect.any(Object),
            fileNameKr: expect.any(Object),
            fileType: expect.any(Object),
            fileSize: expect.any(Object),
            filePath: expect.any(Object),
            materialTopicLevel: expect.any(Object),
          })
        );
      });

      it('passing IFileTopic should create a new form with FormGroup', () => {
        const formGroup = service.createFileTopicFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileOrginalName: expect.any(Object),
            fileNameUz: expect.any(Object),
            fileNameRu: expect.any(Object),
            fileNameKr: expect.any(Object),
            fileType: expect.any(Object),
            fileSize: expect.any(Object),
            filePath: expect.any(Object),
            materialTopicLevel: expect.any(Object),
          })
        );
      });
    });

    describe('getFileTopic', () => {
      it('should return NewFileTopic for default FileTopic initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFileTopicFormGroup(sampleWithNewData);

        const fileTopic = service.getFileTopic(formGroup) as any;

        expect(fileTopic).toMatchObject(sampleWithNewData);
      });

      it('should return NewFileTopic for empty FileTopic initial value', () => {
        const formGroup = service.createFileTopicFormGroup();

        const fileTopic = service.getFileTopic(formGroup) as any;

        expect(fileTopic).toMatchObject({});
      });

      it('should return IFileTopic', () => {
        const formGroup = service.createFileTopicFormGroup(sampleWithRequiredData);

        const fileTopic = service.getFileTopic(formGroup) as any;

        expect(fileTopic).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFileTopic should not enable id FormControl', () => {
        const formGroup = service.createFileTopicFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFileTopic should disable id FormControl', () => {
        const formGroup = service.createFileTopicFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
