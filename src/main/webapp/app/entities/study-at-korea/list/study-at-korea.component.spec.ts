import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { StudyAtKoreaService } from '../service/study-at-korea.service';

import { StudyAtKoreaComponent } from './study-at-korea.component';

describe('StudyAtKorea Management Component', () => {
  let comp: StudyAtKoreaComponent;
  let fixture: ComponentFixture<StudyAtKoreaComponent>;
  let service: StudyAtKoreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'study-at-korea', component: StudyAtKoreaComponent }]), HttpClientTestingModule],
      declarations: [StudyAtKoreaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(StudyAtKoreaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudyAtKoreaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StudyAtKoreaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.studyAtKoreas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to studyAtKoreaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getStudyAtKoreaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getStudyAtKoreaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
