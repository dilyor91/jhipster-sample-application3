import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FileTopicService } from '../service/file-topic.service';

import { FileTopicComponent } from './file-topic.component';

describe('FileTopic Management Component', () => {
  let comp: FileTopicComponent;
  let fixture: ComponentFixture<FileTopicComponent>;
  let service: FileTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'file-topic', component: FileTopicComponent }]), HttpClientTestingModule],
      declarations: [FileTopicComponent],
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
      .overrideTemplate(FileTopicComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileTopicComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FileTopicService);

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
    expect(comp.fileTopics?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to fileTopicService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFileTopicIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFileTopicIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
