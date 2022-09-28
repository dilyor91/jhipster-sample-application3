import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGreeting } from '../greeting.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../greeting.test-samples';

import { GreetingService } from './greeting.service';

const requireRestSample: IGreeting = {
  ...sampleWithRequiredData,
};

describe('Greeting Service', () => {
  let service: GreetingService;
  let httpMock: HttpTestingController;
  let expectedResult: IGreeting | IGreeting[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GreetingService);
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

    it('should create a Greeting', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const greeting = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(greeting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Greeting', () => {
      const greeting = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(greeting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Greeting', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Greeting', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Greeting', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGreetingToCollectionIfMissing', () => {
      it('should add a Greeting to an empty array', () => {
        const greeting: IGreeting = sampleWithRequiredData;
        expectedResult = service.addGreetingToCollectionIfMissing([], greeting);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(greeting);
      });

      it('should not add a Greeting to an array that contains it', () => {
        const greeting: IGreeting = sampleWithRequiredData;
        const greetingCollection: IGreeting[] = [
          {
            ...greeting,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGreetingToCollectionIfMissing(greetingCollection, greeting);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Greeting to an array that doesn't contain it", () => {
        const greeting: IGreeting = sampleWithRequiredData;
        const greetingCollection: IGreeting[] = [sampleWithPartialData];
        expectedResult = service.addGreetingToCollectionIfMissing(greetingCollection, greeting);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(greeting);
      });

      it('should add only unique Greeting to an array', () => {
        const greetingArray: IGreeting[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const greetingCollection: IGreeting[] = [sampleWithRequiredData];
        expectedResult = service.addGreetingToCollectionIfMissing(greetingCollection, ...greetingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const greeting: IGreeting = sampleWithRequiredData;
        const greeting2: IGreeting = sampleWithPartialData;
        expectedResult = service.addGreetingToCollectionIfMissing([], greeting, greeting2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(greeting);
        expect(expectedResult).toContain(greeting2);
      });

      it('should accept null and undefined values', () => {
        const greeting: IGreeting = sampleWithRequiredData;
        expectedResult = service.addGreetingToCollectionIfMissing([], null, greeting, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(greeting);
      });

      it('should return initial array if no Greeting is added', () => {
        const greetingCollection: IGreeting[] = [sampleWithRequiredData];
        expectedResult = service.addGreetingToCollectionIfMissing(greetingCollection, undefined, null);
        expect(expectedResult).toEqual(greetingCollection);
      });
    });

    describe('compareGreeting', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGreeting(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGreeting(entity1, entity2);
        const compareResult2 = service.compareGreeting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGreeting(entity1, entity2);
        const compareResult2 = service.compareGreeting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGreeting(entity1, entity2);
        const compareResult2 = service.compareGreeting(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
