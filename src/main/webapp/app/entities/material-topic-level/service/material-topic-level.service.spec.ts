import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMaterialTopicLevel } from '../material-topic-level.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../material-topic-level.test-samples';

import { MaterialTopicLevelService } from './material-topic-level.service';

const requireRestSample: IMaterialTopicLevel = {
  ...sampleWithRequiredData,
};

describe('MaterialTopicLevel Service', () => {
  let service: MaterialTopicLevelService;
  let httpMock: HttpTestingController;
  let expectedResult: IMaterialTopicLevel | IMaterialTopicLevel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MaterialTopicLevelService);
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

    it('should create a MaterialTopicLevel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const materialTopicLevel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(materialTopicLevel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MaterialTopicLevel', () => {
      const materialTopicLevel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(materialTopicLevel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MaterialTopicLevel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MaterialTopicLevel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MaterialTopicLevel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMaterialTopicLevelToCollectionIfMissing', () => {
      it('should add a MaterialTopicLevel to an empty array', () => {
        const materialTopicLevel: IMaterialTopicLevel = sampleWithRequiredData;
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing([], materialTopicLevel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialTopicLevel);
      });

      it('should not add a MaterialTopicLevel to an array that contains it', () => {
        const materialTopicLevel: IMaterialTopicLevel = sampleWithRequiredData;
        const materialTopicLevelCollection: IMaterialTopicLevel[] = [
          {
            ...materialTopicLevel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing(materialTopicLevelCollection, materialTopicLevel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MaterialTopicLevel to an array that doesn't contain it", () => {
        const materialTopicLevel: IMaterialTopicLevel = sampleWithRequiredData;
        const materialTopicLevelCollection: IMaterialTopicLevel[] = [sampleWithPartialData];
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing(materialTopicLevelCollection, materialTopicLevel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialTopicLevel);
      });

      it('should add only unique MaterialTopicLevel to an array', () => {
        const materialTopicLevelArray: IMaterialTopicLevel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const materialTopicLevelCollection: IMaterialTopicLevel[] = [sampleWithRequiredData];
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing(materialTopicLevelCollection, ...materialTopicLevelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const materialTopicLevel: IMaterialTopicLevel = sampleWithRequiredData;
        const materialTopicLevel2: IMaterialTopicLevel = sampleWithPartialData;
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing([], materialTopicLevel, materialTopicLevel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialTopicLevel);
        expect(expectedResult).toContain(materialTopicLevel2);
      });

      it('should accept null and undefined values', () => {
        const materialTopicLevel: IMaterialTopicLevel = sampleWithRequiredData;
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing([], null, materialTopicLevel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialTopicLevel);
      });

      it('should return initial array if no MaterialTopicLevel is added', () => {
        const materialTopicLevelCollection: IMaterialTopicLevel[] = [sampleWithRequiredData];
        expectedResult = service.addMaterialTopicLevelToCollectionIfMissing(materialTopicLevelCollection, undefined, null);
        expect(expectedResult).toEqual(materialTopicLevelCollection);
      });
    });

    describe('compareMaterialTopicLevel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMaterialTopicLevel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMaterialTopicLevel(entity1, entity2);
        const compareResult2 = service.compareMaterialTopicLevel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMaterialTopicLevel(entity1, entity2);
        const compareResult2 = service.compareMaterialTopicLevel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMaterialTopicLevel(entity1, entity2);
        const compareResult2 = service.compareMaterialTopicLevel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
