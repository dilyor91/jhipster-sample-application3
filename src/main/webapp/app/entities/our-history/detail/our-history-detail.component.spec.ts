import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OurHistoryDetailComponent } from './our-history-detail.component';

describe('OurHistory Management Detail Component', () => {
  let comp: OurHistoryDetailComponent;
  let fixture: ComponentFixture<OurHistoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurHistoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ourHistory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OurHistoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OurHistoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ourHistory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ourHistory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
