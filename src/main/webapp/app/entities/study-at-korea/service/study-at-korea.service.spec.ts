import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStudyAtKorea } from '../study-at-korea.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../study-at-korea.test-samples';

import { StudyAtKoreaService } from './study-at-korea.service';

const requireRestSample: IStudyAtKorea = {
  ...sampleWithRequiredData,
};

describe('StudyAtKorea Service', () => {
  let service: StudyAtKoreaService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudyAtKorea | IStudyAtKorea[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StudyAtKoreaService);
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

    it('should create a StudyAtKorea', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const studyAtKorea = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studyAtKorea).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudyAtKorea', () => {
      const studyAtKorea = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studyAtKorea).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudyAtKorea', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudyAtKorea', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudyAtKorea', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudyAtKoreaToCollectionIfMissing', () => {
      it('should add a StudyAtKorea to an empty array', () => {
        const studyAtKorea: IStudyAtKorea = sampleWithRequiredData;
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing([], studyAtKorea);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyAtKorea);
      });

      it('should not add a StudyAtKorea to an array that contains it', () => {
        const studyAtKorea: IStudyAtKorea = sampleWithRequiredData;
        const studyAtKoreaCollection: IStudyAtKorea[] = [
          {
            ...studyAtKorea,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing(studyAtKoreaCollection, studyAtKorea);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudyAtKorea to an array that doesn't contain it", () => {
        const studyAtKorea: IStudyAtKorea = sampleWithRequiredData;
        const studyAtKoreaCollection: IStudyAtKorea[] = [sampleWithPartialData];
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing(studyAtKoreaCollection, studyAtKorea);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyAtKorea);
      });

      it('should add only unique StudyAtKorea to an array', () => {
        const studyAtKoreaArray: IStudyAtKorea[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studyAtKoreaCollection: IStudyAtKorea[] = [sampleWithRequiredData];
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing(studyAtKoreaCollection, ...studyAtKoreaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studyAtKorea: IStudyAtKorea = sampleWithRequiredData;
        const studyAtKorea2: IStudyAtKorea = sampleWithPartialData;
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing([], studyAtKorea, studyAtKorea2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyAtKorea);
        expect(expectedResult).toContain(studyAtKorea2);
      });

      it('should accept null and undefined values', () => {
        const studyAtKorea: IStudyAtKorea = sampleWithRequiredData;
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing([], null, studyAtKorea, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyAtKorea);
      });

      it('should return initial array if no StudyAtKorea is added', () => {
        const studyAtKoreaCollection: IStudyAtKorea[] = [sampleWithRequiredData];
        expectedResult = service.addStudyAtKoreaToCollectionIfMissing(studyAtKoreaCollection, undefined, null);
        expect(expectedResult).toEqual(studyAtKoreaCollection);
      });
    });

    describe('compareStudyAtKorea', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudyAtKorea(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudyAtKorea(entity1, entity2);
        const compareResult2 = service.compareStudyAtKorea(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudyAtKorea(entity1, entity2);
        const compareResult2 = service.compareStudyAtKorea(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudyAtKorea(entity1, entity2);
        const compareResult2 = service.compareStudyAtKorea(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
