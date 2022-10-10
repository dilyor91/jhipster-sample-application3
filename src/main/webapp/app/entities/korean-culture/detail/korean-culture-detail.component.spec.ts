import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KoreanCultureDetailComponent } from './korean-culture-detail.component';

describe('KoreanCulture Management Detail Component', () => {
  let comp: KoreanCultureDetailComponent;
  let fixture: ComponentFixture<KoreanCultureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KoreanCultureDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ koreanCulture: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(KoreanCultureDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(KoreanCultureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load koreanCulture on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.koreanCulture).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
