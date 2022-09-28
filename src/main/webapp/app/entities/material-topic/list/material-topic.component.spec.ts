import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MaterialTopicService } from '../service/material-topic.service';

import { MaterialTopicComponent } from './material-topic.component';

describe('MaterialTopic Management Component', () => {
  let comp: MaterialTopicComponent;
  let fixture: ComponentFixture<MaterialTopicComponent>;
  let service: MaterialTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'material-topic', component: MaterialTopicComponent }]), HttpClientTestingModule],
      declarations: [MaterialTopicComponent],
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
      .overrideTemplate(MaterialTopicComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialTopicComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MaterialTopicService);

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
    expect(comp.materialTopics?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to materialTopicService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getMaterialTopicIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getMaterialTopicIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
