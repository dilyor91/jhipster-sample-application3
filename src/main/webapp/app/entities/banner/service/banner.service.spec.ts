import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBanner } from '../banner.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../banner.test-samples';

import { BannerService } from './banner.service';

const requireRestSample: IBanner = {
  ...sampleWithRequiredData,
};

describe('Banner Service', () => {
  let service: BannerService;
  let httpMock: HttpTestingController;
  let expectedResult: IBanner | IBanner[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BannerService);
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

    it('should create a Banner', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const banner = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(banner).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Banner', () => {
      const banner = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(banner).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Banner', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Banner', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Banner', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBannerToCollectionIfMissing', () => {
      it('should add a Banner to an empty array', () => {
        const banner: IBanner = sampleWithRequiredData;
        expectedResult = service.addBannerToCollectionIfMissing([], banner);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(banner);
      });

      it('should not add a Banner to an array that contains it', () => {
        const banner: IBanner = sampleWithRequiredData;
        const bannerCollection: IBanner[] = [
          {
            ...banner,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBannerToCollectionIfMissing(bannerCollection, banner);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Banner to an array that doesn't contain it", () => {
        const banner: IBanner = sampleWithRequiredData;
        const bannerCollection: IBanner[] = [sampleWithPartialData];
        expectedResult = service.addBannerToCollectionIfMissing(bannerCollection, banner);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(banner);
      });

      it('should add only unique Banner to an array', () => {
        const bannerArray: IBanner[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bannerCollection: IBanner[] = [sampleWithRequiredData];
        expectedResult = service.addBannerToCollectionIfMissing(bannerCollection, ...bannerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const banner: IBanner = sampleWithRequiredData;
        const banner2: IBanner = sampleWithPartialData;
        expectedResult = service.addBannerToCollectionIfMissing([], banner, banner2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(banner);
        expect(expectedResult).toContain(banner2);
      });

      it('should accept null and undefined values', () => {
        const banner: IBanner = sampleWithRequiredData;
        expectedResult = service.addBannerToCollectionIfMissing([], null, banner, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(banner);
      });

      it('should return initial array if no Banner is added', () => {
        const bannerCollection: IBanner[] = [sampleWithRequiredData];
        expectedResult = service.addBannerToCollectionIfMissing(bannerCollection, undefined, null);
        expect(expectedResult).toEqual(bannerCollection);
      });
    });

    describe('compareBanner', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBanner(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBanner(entity1, entity2);
        const compareResult2 = service.compareBanner(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBanner(entity1, entity2);
        const compareResult2 = service.compareBanner(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBanner(entity1, entity2);
        const compareResult2 = service.compareBanner(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
