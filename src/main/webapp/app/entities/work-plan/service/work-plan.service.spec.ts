import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorkPlan } from '../work-plan.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../work-plan.test-samples';

import { WorkPlanService } from './work-plan.service';

const requireRestSample: IWorkPlan = {
  ...sampleWithRequiredData,
};

describe('WorkPlan Service', () => {
  let service: WorkPlanService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkPlan | IWorkPlan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkPlanService);
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

    it('should create a WorkPlan', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workPlan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workPlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkPlan', () => {
      const workPlan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workPlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkPlan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkPlan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkPlan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkPlanToCollectionIfMissing', () => {
      it('should add a WorkPlan to an empty array', () => {
        const workPlan: IWorkPlan = sampleWithRequiredData;
        expectedResult = service.addWorkPlanToCollectionIfMissing([], workPlan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workPlan);
      });

      it('should not add a WorkPlan to an array that contains it', () => {
        const workPlan: IWorkPlan = sampleWithRequiredData;
        const workPlanCollection: IWorkPlan[] = [
          {
            ...workPlan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkPlanToCollectionIfMissing(workPlanCollection, workPlan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkPlan to an array that doesn't contain it", () => {
        const workPlan: IWorkPlan = sampleWithRequiredData;
        const workPlanCollection: IWorkPlan[] = [sampleWithPartialData];
        expectedResult = service.addWorkPlanToCollectionIfMissing(workPlanCollection, workPlan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workPlan);
      });

      it('should add only unique WorkPlan to an array', () => {
        const workPlanArray: IWorkPlan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workPlanCollection: IWorkPlan[] = [sampleWithRequiredData];
        expectedResult = service.addWorkPlanToCollectionIfMissing(workPlanCollection, ...workPlanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workPlan: IWorkPlan = sampleWithRequiredData;
        const workPlan2: IWorkPlan = sampleWithPartialData;
        expectedResult = service.addWorkPlanToCollectionIfMissing([], workPlan, workPlan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workPlan);
        expect(expectedResult).toContain(workPlan2);
      });

      it('should accept null and undefined values', () => {
        const workPlan: IWorkPlan = sampleWithRequiredData;
        expectedResult = service.addWorkPlanToCollectionIfMissing([], null, workPlan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workPlan);
      });

      it('should return initial array if no WorkPlan is added', () => {
        const workPlanCollection: IWorkPlan[] = [sampleWithRequiredData];
        expectedResult = service.addWorkPlanToCollectionIfMissing(workPlanCollection, undefined, null);
        expect(expectedResult).toEqual(workPlanCollection);
      });
    });

    describe('compareWorkPlan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkPlan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkPlan(entity1, entity2);
        const compareResult2 = service.compareWorkPlan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkPlan(entity1, entity2);
        const compareResult2 = service.compareWorkPlan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkPlan(entity1, entity2);
        const compareResult2 = service.compareWorkPlan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
