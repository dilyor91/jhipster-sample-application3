import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TimeTableDetailComponent } from './time-table-detail.component';

describe('TimeTable Management Detail Component', () => {
  let comp: TimeTableDetailComponent;
  let fixture: ComponentFixture<TimeTableDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ timeTable: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TimeTableDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TimeTableDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load timeTable on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.timeTable).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
