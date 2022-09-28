import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFileTopic } from '../file-topic.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../file-topic.test-samples';

import { FileTopicService } from './file-topic.service';

const requireRestSample: IFileTopic = {
  ...sampleWithRequiredData,
};

describe('FileTopic Service', () => {
  let service: FileTopicService;
  let httpMock: HttpTestingController;
  let expectedResult: IFileTopic | IFileTopic[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FileTopicService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a FileTopic', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fileTopic = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fileTopic).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FileTopic', () => {
      const fileTopic = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fileTopic).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FileTopic', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FileTopic', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FileTopic', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFileTopicToCollectionIfMissing', () => {
      it('should add a FileTopic to an empty array', () => {
        const fileTopic: IFileTopic = sampleWithRequiredData;
        expectedResult = service.addFileTopicToCollectionIfMissing([], fileTopic);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileTopic);
      });

      it('should not add a FileTopic to an array that contains it', () => {
        const fileTopic: IFileTopic = sampleWithRequiredData;
        const fileTopicCollection: IFileTopic[] = [
          {
            ...fileTopic,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFileTopicToCollectionIfMissing(fileTopicCollection, fileTopic);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FileTopic to an array that doesn't contain it", () => {
        const fileTopic: IFileTopic = sampleWithRequiredData;
        const fileTopicCollection: IFileTopic[] = [sampleWithPartialData];
        expectedResult = service.addFileTopicToCollectionIfMissing(fileTopicCollection, fileTopic);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileTopic);
      });

      it('should add only unique FileTopic to an array', () => {
        const fileTopicArray: IFileTopic[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fileTopicCollection: IFileTopic[] = [sampleWithRequiredData];
        expectedResult = service.addFileTopicToCollectionIfMissing(fileTopicCollection, ...fileTopicArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fileTopic: IFileTopic = sampleWithRequiredData;
        const fileTopic2: IFileTopic = sampleWithPartialData;
        expectedResult = service.addFileTopicToCollectionIfMissing([], fileTopic, fileTopic2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileTopic);
        expect(expectedResult).toContain(fileTopic2);
      });

      it('should accept null and undefined values', () => {
        const fileTopic: IFileTopic = sampleWithRequiredData;
        expectedResult = service.addFileTopicToCollectionIfMissing([], null, fileTopic, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileTopic);
      });

      it('should return initial array if no FileTopic is added', () => {
        const fileTopicCollection: IFileTopic[] = [sampleWithRequiredData];
        expectedResult = service.addFileTopicToCollectionIfMissing(fileTopicCollection, undefined, null);
        expect(expectedResult).toEqual(fileTopicCollection);
      });
    });

    describe('compareFileTopic', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFileTopic(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFileTopic(entity1, entity2);
        const compareResult2 = service.compareFileTopic(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFileTopic(entity1, entity2);
        const compareResult2 = service.compareFileTopic(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFileTopic(entity1, entity2);
        const compareResult2 = service.compareFileTopic(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
