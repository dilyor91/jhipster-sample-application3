import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaterialTopicLevelDetailComponent } from './material-topic-level-detail.component';

describe('MaterialTopicLevel Management Detail Component', () => {
  let comp: MaterialTopicLevelDetailComponent;
  let fixture: ComponentFixture<MaterialTopicLevelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTopicLevelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ materialTopicLevel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MaterialTopicLevelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaterialTopicLevelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load materialTopicLevel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.materialTopicLevel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
