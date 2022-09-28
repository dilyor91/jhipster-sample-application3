import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FileTopicDetailComponent } from './file-topic-detail.component';

describe('FileTopic Management Detail Component', () => {
  let comp: FileTopicDetailComponent;
  let fixture: ComponentFixture<FileTopicDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileTopicDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fileTopic: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FileTopicDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FileTopicDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fileTopic on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fileTopic).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
