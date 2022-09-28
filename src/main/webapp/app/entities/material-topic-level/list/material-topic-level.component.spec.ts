import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MaterialTopicLevelService } from '../service/material-topic-level.service';

import { MaterialTopicLevelComponent } from './material-topic-level.component';

describe('MaterialTopicLevel Management Component', () => {
  let comp: MaterialTopicLevelComponent;
  let fixture: ComponentFixture<MaterialTopicLevelComponent>;
  let service: MaterialTopicLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'material-topic-level', component: MaterialTopicLevelComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [MaterialTopicLevelComponent],
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
      .overrideTemplate(MaterialTopicLevelComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialTopicLevelComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MaterialTopicLevelService);

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
    expect(comp.materialTopicLevels?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to materialTopicLevelService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMaterialTopicLevelIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMaterialTopicLevelIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
