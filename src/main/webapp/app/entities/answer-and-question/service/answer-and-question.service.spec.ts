import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAnswerAndQuestion } from '../answer-and-question.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../answer-and-question.test-samples';

import { AnswerAndQuestionService } from './answer-and-question.service';

const requireRestSample: IAnswerAndQuestion = {
  ...sampleWithRequiredData,
};

describe('AnswerAndQuestion Service', () => {
  let service: AnswerAndQuestionService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnswerAndQuestion | IAnswerAndQuestion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AnswerAndQuestionService);
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

    it('should create a AnswerAndQuestion', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const answerAndQuestion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(answerAndQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AnswerAndQuestion', () => {
      const answerAndQuestion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(answerAndQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AnswerAndQuestion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AnswerAndQuestion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AnswerAndQuestion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnswerAndQuestionToCollectionIfMissing', () => {
      it('should add a AnswerAndQuestion to an empty array', () => {
        const answerAndQuestion: IAnswerAndQuestion = sampleWithRequiredData;
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing([], answerAndQuestion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(answerAndQuestion);
      });

      it('should not add a AnswerAndQuestion to an array that contains it', () => {
        const answerAndQuestion: IAnswerAndQuestion = sampleWithRequiredData;
        const answerAndQuestionCollection: IAnswerAndQuestion[] = [
          {
            ...answerAndQuestion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing(answerAndQuestionCollection, answerAndQuestion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AnswerAndQuestion to an array that doesn't contain it", () => {
        const answerAndQuestion: IAnswerAndQuestion = sampleWithRequiredData;
        const answerAndQuestionCollection: IAnswerAndQuestion[] = [sampleWithPartialData];
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing(answerAndQuestionCollection, answerAndQuestion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(answerAndQuestion);
      });

      it('should add only unique AnswerAndQuestion to an array', () => {
        const answerAndQuestionArray: IAnswerAndQuestion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const answerAndQuestionCollection: IAnswerAndQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing(answerAndQuestionCollection, ...answerAndQuestionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const answerAndQuestion: IAnswerAndQuestion = sampleWithRequiredData;
        const answerAndQuestion2: IAnswerAndQuestion = sampleWithPartialData;
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing([], answerAndQuestion, answerAndQuestion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(answerAndQuestion);
        expect(expectedResult).toContain(answerAndQuestion2);
      });

      it('should accept null and undefined values', () => {
        const answerAndQuestion: IAnswerAndQuestion = sampleWithRequiredData;
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing([], null, answerAndQuestion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(answerAndQuestion);
      });

      it('should return initial array if no AnswerAndQuestion is added', () => {
        const answerAndQuestionCollection: IAnswerAndQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addAnswerAndQuestionToCollectionIfMissing(answerAndQuestionCollection, undefined, null);
        expect(expectedResult).toEqual(answerAndQuestionCollection);
      });
    });

    describe('compareAnswerAndQuestion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnswerAndQuestion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAnswerAndQuestion(entity1, entity2);
        const compareResult2 = service.compareAnswerAndQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAnswerAndQuestion(entity1, entity2);
        const compareResult2 = service.compareAnswerAndQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAnswerAndQuestion(entity1, entity2);
        const compareResult2 = service.compareAnswerAndQuestion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
