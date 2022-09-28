import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaterialTopicDetailComponent } from './material-topic-detail.component';

describe('MaterialTopic Management Detail Component', () => {
  let comp: MaterialTopicDetailComponent;
  let fixture: ComponentFixture<MaterialTopicDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTopicDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ materialTopic: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MaterialTopicDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaterialTopicDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load materialTopic on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.materialTopic).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
