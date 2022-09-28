import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnswerAndQuestionService } from '../service/answer-and-question.service';

import { AnswerAndQuestionComponent } from './answer-and-question.component';

describe('AnswerAndQuestion Management Component', () => {
  let comp: AnswerAndQuestionComponent;
  let fixture: ComponentFixture<AnswerAndQuestionComponent>;
  let service: AnswerAndQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'answer-and-question', component: AnswerAndQuestionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [AnswerAndQuestionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(AnswerAndQuestionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnswerAndQuestionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AnswerAndQuestionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.answerAndQuestions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to answerAndQuestionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAnswerAndQuestionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAnswerAndQuestionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
