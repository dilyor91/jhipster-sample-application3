import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreetingDetailComponent } from './greeting-detail.component';

describe('Greeting Management Detail Component', () => {
  let comp: GreetingDetailComponent;
  let fixture: ComponentFixture<GreetingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreetingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ greeting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GreetingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GreetingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load greeting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.greeting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
