import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IKoreanCulture } from '../korean-culture.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../korean-culture.test-samples';

import { KoreanCultureService } from './korean-culture.service';

const requireRestSample: IKoreanCulture = {
  ...sampleWithRequiredData,
};

describe('KoreanCulture Service', () => {
  let service: KoreanCultureService;
  let httpMock: HttpTestingController;
  let expectedResult: IKoreanCulture | IKoreanCulture[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(KoreanCultureService);
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

    it('should create a KoreanCulture', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const koreanCulture = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(koreanCulture).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KoreanCulture', () => {
      const koreanCulture = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(koreanCulture).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KoreanCulture', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KoreanCulture', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KoreanCulture', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKoreanCultureToCollectionIfMissing', () => {
      it('should add a KoreanCulture to an empty array', () => {
        const koreanCulture: IKoreanCulture = sampleWithRequiredData;
        expectedResult = service.addKoreanCultureToCollectionIfMissing([], koreanCulture);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(koreanCulture);
      });

      it('should not add a KoreanCulture to an array that contains it', () => {
        const koreanCulture: IKoreanCulture = sampleWithRequiredData;
        const koreanCultureCollection: IKoreanCulture[] = [
          {
            ...koreanCulture,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKoreanCultureToCollectionIfMissing(koreanCultureCollection, koreanCulture);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KoreanCulture to an array that doesn't contain it", () => {
        const koreanCulture: IKoreanCulture = sampleWithRequiredData;
        const koreanCultureCollection: IKoreanCulture[] = [sampleWithPartialData];
        expectedResult = service.addKoreanCultureToCollectionIfMissing(koreanCultureCollection, koreanCulture);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(koreanCulture);
      });

      it('should add only unique KoreanCulture to an array', () => {
        const koreanCultureArray: IKoreanCulture[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const koreanCultureCollection: IKoreanCulture[] = [sampleWithRequiredData];
        expectedResult = service.addKoreanCultureToCollectionIfMissing(koreanCultureCollection, ...koreanCultureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const koreanCulture: IKoreanCulture = sampleWithRequiredData;
        const koreanCulture2: IKoreanCulture = sampleWithPartialData;
        expectedResult = service.addKoreanCultureToCollectionIfMissing([], koreanCulture, koreanCulture2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(koreanCulture);
        expect(expectedResult).toContain(koreanCulture2);
      });

      it('should accept null and undefined values', () => {
        const koreanCulture: IKoreanCulture = sampleWithRequiredData;
        expectedResult = service.addKoreanCultureToCollectionIfMissing([], null, koreanCulture, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(koreanCulture);
      });

      it('should return initial array if no KoreanCulture is added', () => {
        const koreanCultureCollection: IKoreanCulture[] = [sampleWithRequiredData];
        expectedResult = service.addKoreanCultureToCollectionIfMissing(koreanCultureCollection, undefined, null);
        expect(expectedResult).toEqual(koreanCultureCollection);
      });
    });

    describe('compareKoreanCulture', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKoreanCulture(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareKoreanCulture(entity1, entity2);
        const compareResult2 = service.compareKoreanCulture(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareKoreanCulture(entity1, entity2);
        const compareResult2 = service.compareKoreanCulture(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareKoreanCulture(entity1, entity2);
        const compareResult2 = service.compareKoreanCulture(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
