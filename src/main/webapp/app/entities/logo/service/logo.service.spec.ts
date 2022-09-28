import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILogo } from '../logo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../logo.test-samples';

import { LogoService } from './logo.service';

const requireRestSample: ILogo = {
  ...sampleWithRequiredData,
};

describe('Logo Service', () => {
  let service: LogoService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogo | ILogo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LogoService);
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

    it('should create a Logo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const logo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Logo', () => {
      const logo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Logo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Logo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Logo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogoToCollectionIfMissing', () => {
      it('should add a Logo to an empty array', () => {
        const logo: ILogo = sampleWithRequiredData;
        expectedResult = service.addLogoToCollectionIfMissing([], logo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logo);
      });

      it('should not add a Logo to an array that contains it', () => {
        const logo: ILogo = sampleWithRequiredData;
        const logoCollection: ILogo[] = [
          {
            ...logo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogoToCollectionIfMissing(logoCollection, logo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Logo to an array that doesn't contain it", () => {
        const logo: ILogo = sampleWithRequiredData;
        const logoCollection: ILogo[] = [sampleWithPartialData];
        expectedResult = service.addLogoToCollectionIfMissing(logoCollection, logo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logo);
      });

      it('should add only unique Logo to an array', () => {
        const logoArray: ILogo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logoCollection: ILogo[] = [sampleWithRequiredData];
        expectedResult = service.addLogoToCollectionIfMissing(logoCollection, ...logoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logo: ILogo = sampleWithRequiredData;
        const logo2: ILogo = sampleWithPartialData;
        expectedResult = service.addLogoToCollectionIfMissing([], logo, logo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logo);
        expect(expectedResult).toContain(logo2);
      });

      it('should accept null and undefined values', () => {
        const logo: ILogo = sampleWithRequiredData;
        expectedResult = service.addLogoToCollectionIfMissing([], null, logo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logo);
      });

      it('should return initial array if no Logo is added', () => {
        const logoCollection: ILogo[] = [sampleWithRequiredData];
        expectedResult = service.addLogoToCollectionIfMissing(logoCollection, undefined, null);
        expect(expectedResult).toEqual(logoCollection);
      });
    });

    describe('compareLogo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogo(entity1, entity2);
        const compareResult2 = service.compareLogo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogo(entity1, entity2);
        const compareResult2 = service.compareLogo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogo(entity1, entity2);
        const compareResult2 = service.compareLogo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
