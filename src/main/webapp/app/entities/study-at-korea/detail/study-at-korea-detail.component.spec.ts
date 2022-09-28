import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudyAtKoreaDetailComponent } from './study-at-korea-detail.component';

describe('StudyAtKorea Management Detail Component', () => {
  let comp: StudyAtKoreaDetailComponent;
  let fixture: ComponentFixture<StudyAtKoreaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyAtKoreaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ studyAtKorea: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StudyAtKoreaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StudyAtKoreaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load studyAtKorea on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.studyAtKorea).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
