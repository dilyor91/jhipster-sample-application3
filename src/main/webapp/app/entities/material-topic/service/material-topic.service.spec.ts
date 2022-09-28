import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMaterialTopic } from '../material-topic.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../material-topic.test-samples';

import { MaterialTopicService } from './material-topic.service';

const requireRestSample: IMaterialTopic = {
  ...sampleWithRequiredData,
};

describe('MaterialTopic Service', () => {
  let service: MaterialTopicService;
  let httpMock: HttpTestingController;
  let expectedResult: IMaterialTopic | IMaterialTopic[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MaterialTopicService);
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

    it('should create a MaterialTopic', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const materialTopic = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(materialTopic).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MaterialTopic', () => {
      const materialTopic = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(materialTopic).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MaterialTopic', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MaterialTopic', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MaterialTopic', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMaterialTopicToCollectionIfMissing', () => {
      it('should add a MaterialTopic to an empty array', () => {
        const materialTopic: IMaterialTopic = sampleWithRequiredData;
        expectedResult = service.addMaterialTopicToCollectionIfMissing([], materialTopic);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialTopic);
      });

      it('should not add a MaterialTopic to an array that contains it', () => {
        const materialTopic: IMaterialTopic = sampleWithRequiredData;
        const materialTopicCollection: IMaterialTopic[] = [
          {
            ...materialTopic,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMaterialTopicToCollectionIfMissing(materialTopicCollection, materialTopic);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MaterialTopic to an array that doesn't contain it", () => {
        const materialTopic: IMaterialTopic = sampleWithRequiredData;
        const materialTopicCollection: IMaterialTopic[] = [sampleWithPartialData];
        expectedResult = service.addMaterialTopicToCollectionIfMissing(materialTopicCollection, materialTopic);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialTopic);
      });

      it('should add only unique MaterialTopic to an array', () => {
        const materialTopicArray: IMaterialTopic[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const materialTopicCollection: IMaterialTopic[] = [sampleWithRequiredData];
        expectedResult = service.addMaterialTopicToCollectionIfMissing(materialTopicCollection, ...materialTopicArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const materialTopic: IMaterialTopic = sampleWithRequiredData;
        const materialTopic2: IMaterialTopic = sampleWithPartialData;
        expectedResult = service.addMaterialTopicToCollectionIfMissing([], materialTopic, materialTopic2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialTopic);
        expect(expectedResult).toContain(materialTopic2);
      });

      it('should accept null and undefined values', () => {
        const materialTopic: IMaterialTopic = sampleWithRequiredData;
        expectedResult = service.addMaterialTopicToCollectionIfMissing([], null, materialTopic, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialTopic);
      });

      it('should return initial array if no MaterialTopic is added', () => {
        const materialTopicCollection: IMaterialTopic[] = [sampleWithRequiredData];
        expectedResult = service.addMaterialTopicToCollectionIfMissing(materialTopicCollection, undefined, null);
        expect(expectedResult).toEqual(materialTopicCollection);
      });
    });

    describe('compareMaterialTopic', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMaterialTopic(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMaterialTopic(entity1, entity2);
        const compareResult2 = service.compareMaterialTopic(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMaterialTopic(entity1, entity2);
        const compareResult2 = service.compareMaterialTopic(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMaterialTopic(entity1, entity2);
        const compareResult2 = service.compareMaterialTopic(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
