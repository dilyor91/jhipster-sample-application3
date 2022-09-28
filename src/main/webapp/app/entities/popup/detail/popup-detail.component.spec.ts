import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PopupDetailComponent } from './popup-detail.component';

describe('Popup Management Detail Component', () => {
  let comp: PopupDetailComponent;
  let fixture: ComponentFixture<PopupDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ popup: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PopupDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PopupDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load popup on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.popup).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
