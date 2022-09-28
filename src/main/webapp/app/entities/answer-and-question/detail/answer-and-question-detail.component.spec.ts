import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnswerAndQuestionDetailComponent } from './answer-and-question-detail.component';

describe('AnswerAndQuestion Management Detail Component', () => {
  let comp: AnswerAndQuestionDetailComponent;
  let fixture: ComponentFixture<AnswerAndQuestionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerAndQuestionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ answerAndQuestion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AnswerAndQuestionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AnswerAndQuestionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load answerAndQuestion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.answerAndQuestion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
