import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPopup } from '../popup.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../popup.test-samples';

import { PopupService } from './popup.service';

const requireRestSample: IPopup = {
  ...sampleWithRequiredData,
};

describe('Popup Service', () => {
  let service: PopupService;
  let httpMock: HttpTestingController;
  let expectedResult: IPopup | IPopup[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PopupService);
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

    it('should create a Popup', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const popup = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(popup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Popup', () => {
      const popup = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(popup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Popup', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Popup', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Popup', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPopupToCollectionIfMissing', () => {
      it('should add a Popup to an empty array', () => {
        const popup: IPopup = sampleWithRequiredData;
        expectedResult = service.addPopupToCollectionIfMissing([], popup);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(popup);
      });

      it('should not add a Popup to an array that contains it', () => {
        const popup: IPopup = sampleWithRequiredData;
        const popupCollection: IPopup[] = [
          {
            ...popup,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPopupToCollectionIfMissing(popupCollection, popup);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Popup to an array that doesn't contain it", () => {
        const popup: IPopup = sampleWithRequiredData;
        const popupCollection: IPopup[] = [sampleWithPartialData];
        expectedResult = service.addPopupToCollectionIfMissing(popupCollection, popup);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(popup);
      });

      it('should add only unique Popup to an array', () => {
        const popupArray: IPopup[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const popupCollection: IPopup[] = [sampleWithRequiredData];
        expectedResult = service.addPopupToCollectionIfMissing(popupCollection, ...popupArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const popup: IPopup = sampleWithRequiredData;
        const popup2: IPopup = sampleWithPartialData;
        expectedResult = service.addPopupToCollectionIfMissing([], popup, popup2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(popup);
        expect(expectedResult).toContain(popup2);
      });

      it('should accept null and undefined values', () => {
        const popup: IPopup = sampleWithRequiredData;
        expectedResult = service.addPopupToCollectionIfMissing([], null, popup, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(popup);
      });

      it('should return initial array if no Popup is added', () => {
        const popupCollection: IPopup[] = [sampleWithRequiredData];
        expectedResult = service.addPopupToCollectionIfMissing(popupCollection, undefined, null);
        expect(expectedResult).toEqual(popupCollection);
      });
    });

    describe('comparePopup', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePopup(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePopup(entity1, entity2);
        const compareResult2 = service.comparePopup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePopup(entity1, entity2);
        const compareResult2 = service.comparePopup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePopup(entity1, entity2);
        const compareResult2 = service.comparePopup(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
