import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LogoDetailComponent } from './logo-detail.component';

describe('Logo Management Detail Component', () => {
  let comp: LogoDetailComponent;
  let fixture: ComponentFixture<LogoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ logo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LogoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LogoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load logo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.logo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
